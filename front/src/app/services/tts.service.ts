import { Injectable } from '@angular/core';
import { ProgressCallback, ProgressInfo } from '@huggingface/transformers';
import { KokoroTTS } from "kokoro-js"

@Injectable({
  providedIn: 'root'
})
export class TTSService {

  generator : null | KokoroTTS = null

  constructor() { }

  async init(){
      if(this.generator != null) return
      // @ts-ignore
      this.generator = await KokoroTTS.from_pretrained(
        "onnx-community/Kokoro-82M-ONNX",
        { 
          dtype: "fp32", // fp32, fp16, q8, q4, q4f16
          device:"webgpu",
          // progress_callback : this.progressCB
        },
      );
  }

  progressCB : ProgressCallback = (progressInfo : ProgressInfo) => {
    console.log(JSON.stringify(progressInfo))
  }

  playSound(file: Blob) {
    const audio = new Audio()
    audio.src = URL.createObjectURL(file)
    audio.play().catch(e => console.error('Playback failed:', e));
  }
  
  async generate() : Promise<void>{
    try{
      await this.init()
      if(!this.generator) throw new Error("TTS generator hasn't been initilized.")
      const text = "You never know what you can find in a box of chocolate.";
      const audio = await this.generator.generate(text,
        { voice: "af_sky" }, // See `tts.list_voices()`
      );
      this.playSound(audio.toBlob())      
    }catch(error : unknown){
      console.error(error)
    }
  }
}
