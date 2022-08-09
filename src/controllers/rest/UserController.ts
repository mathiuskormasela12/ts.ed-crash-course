// ========== User Controller
// import all modules
import { BodyParams, MulterOptions, MultipartFile, PathParams, PlatformMulterFile, Response } from "@tsed/common";
import { Controller, Inject } from "@tsed/di";
import { Get, Post, Delete, Put } from "@tsed/schema";
import path from "path";
import multer from "multer";
import { UserModel } from "../../models/UserModel";
import { UserService } from "../../services/UserService";

@Controller('/user')
export class UserController {
	constructor(
		@Inject(UserService) 
			private readonly userService: UserService
	) {}

	@Post('/')
	public addUser(
		@Response() 
		res: Response, 
		
		@BodyParams() 
		body: UserModel
	) {
		return this.userService.addUser(res, body)
	}
	
	@Get('/:id')
	public getUser(
		@Response()
		res: Response,

		@PathParams('id') 
		id: string
	) {
		return this.userService.getUser(res, id)
	}

	@Get('/')
	public getUsers(
		@Response()
		res: Response,
	) {
		return this.userService.getUsers(res)
	}

	@Delete('/:id')
	public deleteUser(
		@Response()
		res: Response,

		@PathParams('id') 
		id: string
	) {
		return this.userService.deleteUser(res, id)
	}

	@Put('/:id')
	public updateUser(
		@Response() 
		res: Response, 

		@PathParams('id') 
		id: string,
		
		@BodyParams() 
		body: UserModel
	) {
		return this.userService.updateUser(res, id, body)
	}

	@Put('/photo/:id')
	@MulterOptions({
		storage: multer.diskStorage({
			destination: (req, file, cb) => {
				cb(null, path.join(__dirname, '../../../uploads'))
			},
			filename: (_, file, cb) => {
				const fileName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
				cb(null, fileName)
			}
		})
	})
	public uploadPhoto(
		@Response() 
		res: Response, 

		@PathParams('id') 
		id: string,

		@MultipartFile('photo')
		photo: PlatformMulterFile
	) {
		return this.userService.uploadPhoto(res, id, photo)
	}
}