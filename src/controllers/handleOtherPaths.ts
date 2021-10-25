import { Response, Request } from 'express';

const handleOtherPaths = (req: Request, res: Response) => res.status(404).send('404');

export default handleOtherPaths;
