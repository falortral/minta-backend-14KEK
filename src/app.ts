import express from "express";
import IController from "interfaces/controller.interface";
import { config } from "dotenv";

export default class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: IController[]) {
    config(); // .env állomány tartalmát beolvassa a process.env globális obejektumba
    this.app = express();
    if (process.env.PORT) {
      this.port = parseInt(process.env.PORT);
    } else {
      this.port = 5000;
    }
    this.connectToDatabase(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  public connectToDatabase(controllers: IController[]) {
    //ha connected, akkor lépünk tovább
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
}
