import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService, LoginFormValue } from './auth.service';
import { Usuario } from '../../core/models/index';
import { Router } from '@angular/router';
import { skip } from 'rxjs';
describe('Pruebas del LoginComponent', () => {
    let service: AuthService;
    let httpController: HttpTestingController;

    beforeEach(async () =>{
        await TestBed.configureTestingModule({
            imports:[
                HttpClientTestingModule

            ]
        }).compileComponents();
        
        service = TestBed.inject(AuthService) 
        httpController = TestBed.inject(HttpTestingController)
    })

    it('El login debe fucionar', () =>{
        const fakeLogin : LoginFormValue ={
            email:'andres.cueva.c@gmail.com',
            password: '1234',
        }

     

        service.obtenerUsuarioAutenticado()
        .pipe(
            skip(1)
        )
        .subscribe((usuario) =>{
            console.log(usuario);
            expect(usuario).toBeTruthy();
            
        });

        spyOn(TestBed.inject(Router), 'navigate')

        const MOCK_REQUEST_RESULT: Usuario[]=[
            {
                id:1,
                apellido: 'ApellidoTest',
                nombre: 'NombreTest',
                email: fakeLogin.email,
                password: fakeLogin.password,
                token: 'asdsdfsodijalksjdfasdfasdfasdf',
                role:'admin'
            }
        ]
        service.login(fakeLogin);

        httpController
        .expectOne({
          url: `http://localhost:3000/usuarios?email=${fakeLogin.email}&password=${fakeLogin.password}`,
          method: 'GET',
        })
        .flush(MOCK_REQUEST_RESULT);
   
    })
    
    it('El logout debe emitir un authUser null, remover el token del localstorage y redirecionar al usuario', ()=>{
        const spyOnNavigate = spyOn(TestBed.inject(Router), 'navigate');
        const loginFake: LoginFormValue = {
          email: 'test@mail.com',
          password: '123456',
        };
        const MOCK_REQUEST_RESULT: Usuario[] = [
          {
            id: 1,
            apellido: 'testapellido',
            email: loginFake.email,
            nombre: 'testnombre',
            password: loginFake.password,
            role: 'admin',
            token: 'asdjkasdnasjhdj36231321',
          },
        ];
    
        service.login(loginFake);
        httpController
          .expectOne({
            // http://localhost:3000/usuarios
            url: `http://localhost:3000/usuarios?email=${loginFake.email}&password=${loginFake.password}`,
            method: 'GET',
          })
          .flush(MOCK_REQUEST_RESULT);
    
    
        service.logout();
    
        const tokenLs = localStorage.getItem('token');
    
        expect(tokenLs).toBeNull();
        expect(spyOnNavigate).toHaveBeenCalled();
    })
    //`http://localhost:3000/usuarios`
});


