import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {


  constructor(private usuarioService: UsuarioService) {

  }

  canActivate(): Promise<boolean> | boolean {
    console.log("verifica token guard");

    let token = this.usuarioService.token;

    let payload = JSON.parse(atob(token.split('.')[1]));

    console.log(payload);

    let expirado = this.expiro(payload.exp);

    console.log("expirado", expirado);

    if (expirado) {
      return false;
    }

    return this.verificaRenueva(payload.exp);

  }


  //=======================================================================
  // Método para verificar si hay que renovar el token                                                                      
  //=======================================================================
  verificaRenueva(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {

      //esta en segundos se ocupa en milisegundos
      let tokenExp = new Date(fechaExp * 1000);

      let ahora = new Date();

      console.log(tokenExp);
      console.log(ahora);

      //que falte mas de una hora
      ahora.setTime(ahora.getTime() + (4 * 60 * 60 * 1000));

      console.log("renovo token");
      if (tokenExp.getTime() > ahora.getTime()) {
        return true;
      } else {

        this.usuarioService.renovarToken().subscribe(() => {
          resolve(true);
        },
          () => {
            reject(false);
          }
        );
      }

    });
  }


  //=======================================================================
  // Método para sabe si el token ya expiro                                                                      
  //=======================================================================

  expiro(fechaExp: number) {

    //esta en milisegundos pasar a segundos / 1000 pero no da
    let ahora = new Date().getTime() * 1000;
    console.log(ahora);

    if (ahora < fechaExp) {
      return true;//ya expiro
    } else {
      return false;//no ha expirado
    }
  }

}
