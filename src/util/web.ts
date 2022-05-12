import { VercelRequest, VercelResponse } from '@vercel/node';

type Handler = (req: VercelRequest, res: VercelResponse) => void;

export function route(f: (req: VercelRequest) => Promise<unknown>): Handler {
  return (req, res) => {
    f(req)
      .then((output) => res.json(output))
      .catch((err) => res.send(err));
  };
}
