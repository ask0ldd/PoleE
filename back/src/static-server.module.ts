import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
        serveRoot: '/static',
        rootPath: join(__dirname, '..', 'static'),
    }),
  ],
})
export class StaticServerModule {}