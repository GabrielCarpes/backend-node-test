import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { RedocModule } from "nestjs-redoc";
import { name, version } from "./../../../package.json";

export class Docs {
  public static async initialize(app: any): Promise<void> {
    const options = new DocumentBuilder()
      .setTitle(name)
      .addTag("Transação", "Endpoints relacionados a transações")
      .setVersion(version)
      .build();

    const doc = SwaggerModule.createDocument(app, options);

    await RedocModule.setup("/v1/docs", app, doc, {
      title: "BCA Test documentation",
    });
  }
}
