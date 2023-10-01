
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require('mongoose');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

async function migrate() {

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const UserSchema = new mongoose.Schema(
    {
      email: String,
      service_type: String,
      enabled: Boolean,
      external_id: { type: String, default: null },
    },
    { timestamps: true },
  );

  const UserModel = db.model('User', UserSchema);

  await UserModel.updateMany(
    {}, // Filtro (vacío para seleccionar todos los documentos)
    { $set: { external_id: null } }, // Operación de actualización
  );

  console.log('Migración completada.');
  process.exit(0);
}

migrate().catch((err) => {
  console.error('Error en la migración:', err);
  process.exit(1);
});
