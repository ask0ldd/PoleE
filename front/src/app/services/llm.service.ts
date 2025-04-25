import { Injectable } from '@angular/core';
import { pipeline, TextGenerationPipeline, env, Chat, TextGenerationOutput, ProgressCallback } from '@huggingface/transformers'
import { Subject } from 'rxjs';

// https://github.com/huggingface/transformers.js/blob/main/docs/source/pipelines.md

// dev mode : local model
env.allowRemoteModels = false
env.allowLocalModels = true
env.localModelPath = 'http://localhost:3000/static/model'

@Injectable({
  providedIn: 'root'
})
export class LlmService {

  outputSubject = new Subject<string>()
  output$ = this.outputSubject.asObservable()
  isBusy = false

  private generator : TextGenerationPipeline | null = null
  private conversation = new Conversation("You are a helpful assistant. Your goal is to summarize as a list of bullet points any text the user sends you.")

  private progress_callback : ProgressCallback = (progress) => {
    if(!progress.status) return
    if(progress.status == "initiate") {
      this.isBusy = true
      console.log("initiate")
    }
    if(progress.status == "done") {
      this.isBusy = false
      console.log("done")
    }
    if(progress.status == "ready") {
      this.isBusy = false
      console.log("ready")
    }
  }

  private async init() : Promise<void>{
    if(this.generator != null) return
    // @ts-ignore
    this.generator = await pipeline(
      "text-generation",
      "onnx-community/Qwen2.5-0.5B-Instruct",
      // "onnx-community/gemma-3-1b-it-ONNX",
      { 
        dtype: "q4", 
        device: "webgpu",
        progress_callback: this.progress_callback
      },
    )
  }

  async generate(description : string) : Promise<void> {
    try{
      console.log("generate + busy : ", this.isBusy)

      if(this.isBusy) return

      await this.init()

      this.outputSubject.next("")
      if(!this.generator) throw new Error("LLM generator hasn't been initilized.")

      this.conversation.setUserMessage(`Text to summarize : ${description}`)

      this.isBusy = true // !! should interrupt / give choice?
      const generatedData = await this.generator(this.conversation.get(), { max_new_tokens: 128, /*do_sample: false */})

      this.isBusy = false

      this.outputSubject.next(this.parseGeneratedText(generatedData))
      // console.log(generatedData)
      // console.log(JSON.stringify(generatedData[0])) // .generated_text.at(-1).content
    }catch(error : unknown){
      console.error(error)
      this.outputSubject.next("")
    }
  }

  private parseGeneratedText(generatedData : TextGenerationOutput | TextGenerationOutput[]) : string {

    if (!("generated_text" in generatedData[0]) 
        || generatedData[0].generated_text.length < 3
        || !("content" in (generatedData[0].generated_text as Chat)[2])
    ) throw new Error("Invalid generated data format.")

    return (generatedData[0].generated_text as Chat)[2].content
  }

}

class Conversation{

  constructor(systemPrompt? : string){
    this.setSystemPrompt(systemPrompt ?? "You are a helpful assistant.")
  }

  private messages : Chat = [
    { role: "system", content: "You are a helpful assistant. Your goal is to summarize any text the user sends you." },
    { role: "user", content: "" },
  ];

  setUserMessage(message : string) : void {
    const nMessages = this.messages.length
    this.messages[nMessages - 1].content = message
  }

  setSystemPrompt(prompt : string) : void {
    this.messages[0].content = prompt
  }

  get() : Chat {
    return this.messages
  }
}