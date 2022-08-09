// ========== UserModel
// import all modules
import { Model, Unique } from "@tsed/mongoose";
import { Default, Property, Required, Email } from "@tsed/schema";

@Model()
export class UserModel {
	@Property()
	@Required()
	firstName: string;

	@Property()
	@Required()
	lastName: string;

	@Property()
	@Required()
	@Unique()
	@Email()
	email: string;

	@Property()
	@Default('nophoto.png')
	photo: string;
}