import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from "express";
import { jwtConstants } from 'src/auth/constants/jwtConstants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService,) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean>{

    const request = context.switchToHttp().getRequest();
    
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      
      const payload = await this.jwtService.verifyAsync(
        token, 
        {
          secret: `${process.env.JWT_ACCESS_SECRET}`,
          // secret: jwtConstants.secret,
          // secret: 'TopSecret',
        }
      );

      request.usuario = payload;

    } catch (error) {
      throw new UnauthorizedException("Acceso denegado");
    }


    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }

}
