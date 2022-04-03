import { Injectable } from '@angular/core';
import {Surfspot} from "../model/Surfspot";
import  {SPOTS} from "./static.surfspots";

@Injectable({
  providedIn: 'root'
})
export class SurfSpotService {

  getAllSurfspots(): Surfspot[] {
    return SPOTS;
  }
  constructor() { }
}
