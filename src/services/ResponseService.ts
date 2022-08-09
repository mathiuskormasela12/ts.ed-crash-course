// ========== Response Service
// import all modules
import { Response } from "@tsed/common";
import { Injectable } from "@tsed/di";
import { IResponse } from "../interfaces";

@Injectable()
export class ResponseService {
	public generate(@Response() res: Response, response: IResponse) {
		return res.status(response.status).json(response)
	}
}