**Proyecto 10 - Backend**

**¿Te gusta el teatro? ¡Has llegado al lugar idóneo!**

En este apartado del proyecto vemos el Backend. Está estructurado con dos modelos: los castings disponibles para que los usuarios se puedan inscribir en ellos y participar.

**¿Cómo iniciar el proyecto?**

- npm i
- npm run start

**¿Qué variables se han usado en el proyecto?**

- DB\_URL![](Aspose.Words.61c280cc-5f35-43be-9902-02c9655983ba.001.png)
- J WT\_SECRET
- CLOUDI NARY\_CLOUD\_NAME
  - CLOUDI NARY\_API \_KEY
- CLOUDI NARY\_API \_SECRET

**¿Qué librerías tenemos instaladas?**

- Express
- Mongoose
- Nodemon
- Dotenv
- Cloudinary
- Multer
- Multer-storage-cloudinary
- Bcrypt
- Jsonwebtoken
- Cors

**Endpoints**

**Castings**

*En la siguiente tabla tendrás la información referida a los endpoints utilizados en este proyecto, para los castings:![ref1]*



|**Método**|**Ruta**|**Descripción**|
| - | - | - |
|GET|/api/v1/castings|Obtener todos los castings|
|POST|/api/v1/castings|Crear un nuevo casting|
|PUT|/api/v1/castings/:id|Actualizar un casting por ID|
|DELETE|/api/v1/castings/:id|Eliminar un casting por ID|

**Usuarios**

*En la siguiente tabla tendrás la información referida a los endpoints utilizados en este proyecto, para los usuarios:![ref1]*

**Método Ruta Descripción ![](Aspose.Words.61c280cc-5f35-43be-9902-02c9655983ba.003.png)![](Aspose.Words.61c280cc-5f35-43be-9902-02c9655983ba.004.png)**GET /api/v1/users Obtener todos los usuarios POST /api/v1/users/register Registrar un nuevo usuario POST /api/v1/users/login Iniciar sesión de usuario

Actualizar información de un usuario por ID PUT /api/v1/users/:id

(CV)

PUT /api/v1/users/:id/castings Actualizar los castings de un usuario DELETE /api/v1/users/:id Eliminar un usuario por ID

[ref1]: Aspose.Words.61c280cc-5f35-43be-9902-02c9655983ba.002.png
