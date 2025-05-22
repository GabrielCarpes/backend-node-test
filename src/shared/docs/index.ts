import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { RedocModule } from "nestjs-redoc";
import { name, version } from "../../../package.json";

export class Docs {
  public static async initialize(app: any): Promise<void> {
    const config = new DocumentBuilder()
      .setTitle("API de Transações Financeiras")
      .setDescription(`
        Esta API permite o gerenciamento de transações financeiras simples, 
        incluindo criação de transações, remoção em massa e recuperação de estatísticas em tempo real 
        (últimos 60 segundos).

        Também expõe um endpoint de verificação de saúde (health check).
      `)
      .setVersion(version)
      .addTag("Transações", "Endpoints relacionados a transações financeiras.")
      .addTag("Health", "Endpoint para verificação de status da API.")
      .setContact(
        "Equipe de Suporte",
        "https://seudominio.com/suporte",
        "suporte@seudominio.com"
      )
      .setLicense("MIT", "https://opensource.org/licenses/MIT")
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("/v1/swagger", app, document);

    await RedocModule.setup("/v1/docs", app, document, {
      title: "Documentação da API de Transações",
      logo: {
        url: "https://nestjs.com/img/logo-small.svg",
        backgroundColor: "#F0F0F0",
        altText: "Logo da API",
      },
      hideDownloadButton: false,
      hideHostname: false,
    });
  }
}
