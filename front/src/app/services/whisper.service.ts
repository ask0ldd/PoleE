import { Injectable } from '@angular/core';
import { AutomaticSpeechRecognitionPipeline, pipeline } from '@huggingface/transformers';

@Injectable({
  providedIn: 'root'
})
export class WhisperService {
  transcriber : AutomaticSpeechRecognitionPipeline | null = null

  constructor() { }

  async init(){
    if(this.transcriber != null) return
    // @ts-ignore
    this.transcriber = await pipeline(
      "automatic-speech-recognition",
      "onnx-community/whisper-tiny.en",
      { 
        device: "webgpu",
        dtype : 'fp32'
      },
    );    
  }

  async generate() : Promise<void>{
    try{
      await this.init()
      if(!this.transcriber) throw new Error("TTS generator hasn't been initilized.")
      const url = "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/jfk.wav"
      const output = await this.transcriber(url)
      console.log(output)
    }catch(error : unknown){
      console.error(error)
    }
  }
}
