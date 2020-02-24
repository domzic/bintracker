import passport from 'passport';
import { Application } from "express";
import { SensorController } from '../controllers/SensorController';
import { authenticated } from '../middlewares/authenticated';
  
export default function(app: Application) {
    const sensorController = new SensorController();

    app.route('/api/sensors')
        .get(authenticated, sensorController.getSensors);


}