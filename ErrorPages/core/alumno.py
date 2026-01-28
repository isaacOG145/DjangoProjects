class alumno:

    nombre = ''
    apellidos = ''
    edad = 0

    
    def __init__(self, nombre, apellidos, edad):
        self.nombre = nombre
        self.apellidos = apellidos
        self.edad = edad

    def saludar(self):
        return "El alumno {}, te manda un saludo".format(self.nombre)