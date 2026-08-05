// Middleware pou jere erè global (opsyonèl men bon pratik)
exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Yon erè rive nan sèvè a', erreur: err.message });
};