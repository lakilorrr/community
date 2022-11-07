import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export interface validateIds {
  userId: number;
  validateId: number;
}
export const ParamIds = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const userId = req.user.id;
    const validateId = req.params[data];
    return { userId: userId, validateId: +validateId };
  },
);
