import { Injectable } from '@angular/core';
import { pipeline, TextGenerationPipeline } from '@huggingface/transformers'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LlmService {

  output$ = new Subject()

  generator : TextGenerationPipeline | null = null
  messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Tell me a funny joke." },
  ];
  

  constructor() { }

  async init(){
    if(this.generator != null) return
    // @ts-ignore
    this.generator = await pipeline(
      "text-generation",
      "onnx-community/Qwen2.5-0.5B-Instruct",
      { dtype: "q4", device: "webgpu" },
    );
  }

  async generate() : Promise<void>{
    try{
      await this.init()
      if(!this.generator) throw new Error("LLM generator hasn't been initilized.")
      const output = await this.generator(this.messages, { max_new_tokens: 128 });
      this.output$.next(JSON.stringify(output[0]))
      console.log(JSON.stringify(output[0])); // .generated_text.at(-1).content
    }catch(error : unknown){
      console.error(error)
    }
  }
}
