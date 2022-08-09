// ========= User Service
// import all modules
import { BodyParams, MultipartFile, PathParams, PlatformMulterFile, Response } from "@tsed/common";
import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { UserModel } from "src/models/UserModel";
import { ResponseService } from "./ResponseService";

@Injectable()
export class UserService {
	constructor(
		@Inject(ResponseService) 
		private readonly responseService: ResponseService,

		@Inject(UserModel)
		private userModel: MongooseModel<UserModel>
	) {}

	public async addUser(
		@Response() 
		res: Response, 
		
		@BodyParams() 
		body: UserModel
	): Promise<Response> {
		try {
			const user = await this.userModel.findOne({ email: body.email })

			if(user) {
				return this.responseService.generate(res, {
					status: 400,
					success: false,
					message: 'The email has been used'
				})
			}

			try {
				await this.userModel.create({
					firstName: body.firstName,
					lastName: body.lastName,
					email: body.email
				})

				return this.responseService.generate(res, {
					status: 200,
					success: true,
					message: 'The user has been created'
				})
			} catch (err) {
				return this.responseService.generate(res, {
					status: 500,
					success: false,
					message: err.message
				})
			}
		} catch (err) {
			return this.responseService.generate(res, {
				status: 500,
				success: false,
				message: err.message
			})
		}
	}

	public async getUser(
		@Response() 
		res: Response, 
		
		@PathParams('id')
		id: string
	): Promise<Response> {
		try {
			const user = await this.userModel.findById(id)

			if(!user) {
				return this.responseService.generate(res, {
					status: 404,
					success: false,
					message: 'The user is not found'
				})
			}

			return this.responseService.generate(res, {
				status: 200,
				success: true,
				message: 'Success get a user',
				results: user
			})
		} catch (err) {
			return this.responseService.generate(res, {
				status: 500,
				success: false,
				message: err.message
			})
		}
	}

	public async getUsers(
		@Response() 
		res: Response, 
	): Promise<Response> {
		try {
			const user = await this.userModel.find()

			if(!user) {
				return this.responseService.generate(res, {
					status: 404,
					success: false,
					message: 'The user does not exists'
				})
			}

			return this.responseService.generate(res, {
				status: 200,
				success: true,
				message: 'Success get a user',
				results: user
			})
		} catch (err) {
			return this.responseService.generate(res, {
				status: 500,
				success: false,
				message: err.message
			})
		}
	}

	public async deleteUser(
		@Response() 
		res: Response, 
		
		@PathParams('id')
		id: string
	): Promise<Response> {
		try {
			const user = await this.userModel.findByIdAndRemove(id)

			if(!user) {
				return this.responseService.generate(res, {
					status: 404,
					success: false,
					message: 'The user is not found'
				})
			}

			return this.responseService.generate(res, {
				status: 200,
				success: true,
				message: 'Success delete a user'
			})
		} catch (err) {
			return this.responseService.generate(res, {
				status: 500,
				success: false,
				message: err.message
			})
		}
	}

	public async updateUser(
		@Response() 
		res: Response, 

		@PathParams('id') 
		id: string,
		
		@BodyParams() 
		body: UserModel
	): Promise<Response> {
		try {
			await this.userModel.findOneAndUpdate({
				_id: id,
			}, body)

			return this.responseService.generate(res, {
				status: 200,
				success: true,
				message: 'The user has been updated'
			})
		} catch (err) {
			return this.responseService.generate(res, {
				status: 500,
				success: false,
				message: err.message
			})
		}
	}

	public async uploadPhoto(
		@Response() 
		res: Response, 

		@PathParams('id') 
		id: string,
		
		@MultipartFile('photo')
		photo: PlatformMulterFile
	): Promise<Response> {
		try {
			await this.userModel.findOneAndUpdate({
				_id: id,
			}, {
				photo: photo.filename
			})

			return this.responseService.generate(res, {
				status: 200,
				success: true,
				message: 'The photo has been uploaded'
			})
		} catch (err) {
			return this.responseService.generate(res, {
				status: 500,
				success: false,
				message: err.message
			})
		}
	}
}