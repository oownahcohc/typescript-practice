import { User } from '../models/users';

declare global {
	namespace Express {
		interface Request {
			user?: User;

            file?: Multer.File;

            files?: {
                [fieldname: string]: MulterS3.File[];
            } | Multer.File[];
		}

        interface Response {}
        interface Application {}
	}
}