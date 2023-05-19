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

    //prueba 1
    it('El login debe fucionar', (done) =>{
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
        done();
   
    })
    

    //prueba 2
    it('El logout debe emitir un authUser null, remover el token del localstorage y redirecionar al usuario', ()=>{
       service.establecerUsuarioAutenticado(
       {
        id: 1,
        apellido: 'testapellido',
        email: 'mail@test.com',
        nombre: 'testnombre',
        password: '1234',
        role: 'admin',
        token: 'asdjkasdnasjhdj36231321',
       });
       const spyOnNavigate = spyOn(TestBed.inject(Router), 'navigate');
       service.logout();
       const tokenLs = localStorage.getItem('token');
       expect(tokenLs).toBeNull();
       expect(spyOnNavigate).toHaveBeenCalled();
      
    })

});


