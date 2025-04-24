import { Injectable } from '@angular/core';
import { pipeline, TextGenerationPipeline, env, Chat, TextGenerationOutput } from '@huggingface/transformers'
import { map, Subject } from 'rxjs';

// https://github.com/huggingface/transformers.js/blob/main/docs/source/pipelines.md

// dev mode : local model
env.allowRemoteModels = false
env.allowLocalModels = true
env.localModelPath = 'http://localhost:3000/static/model'

@Injectable({
  providedIn: 'root'
})
export class LlmService {

  output$ = new Subject<string>()
  i : number = 0

  generator : TextGenerationPipeline | null = null
  messages = [
    { role: "system", content: "You are a helpful assistant. Your goal is to summarize any text the user sends you." },
    { role: "user", content: "" },
  ];

  constructor() { }

  async init(){
    if(this.generator != null) return
    // @ts-ignore
    this.generator = await pipeline(
      "text-generation",
      "onnx-community/Qwen2.5-0.5B-Instruct",
      { 
        dtype: "q4", 
        device: "webgpu",
        progress_callback: () => void 0
      },
    )
  }

  parseGeneratedText(generatedData : TextGenerationOutput | TextGenerationOutput[]) : string{

    if (!("generated_text" in generatedData[0]) 
        || generatedData[0].generated_text.length < 3
        || !("content" in (generatedData[0].generated_text as Chat)[2])
    ) throw new Error("Invalid generated data format.")

    return (generatedData[0].generated_text as Chat)[2].content
  }

  async generate(description : string) : Promise<void>{
    try{
      await this.init()

      this.output$.next("")
      if(!this.generator) throw new Error("LLM generator hasn't been initilized.")

      const sumConv = [...this.messages]
      sumConv[1] = {...sumConv[1], content : `Text to summarize : ${description}`}
      const generatedData = await this.generator(sumConv, { max_new_tokens: 128 })

      this.output$.next(this.parseGeneratedText(generatedData))
      // console.log(JSON.stringify(generatedData[0])) // .generated_text.at(-1).content
    }catch(error : unknown){
      console.error(error)
      this.output$.next("")
    }
  }
}
