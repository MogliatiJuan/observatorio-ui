const corregirCodificacion = (texto) => {
  const textoCorregido = texto
    .replace(/Ã¡/g, "á")
    .replace(/Ã©/g, "é")
    .replace(/Ã­/g, "í")
    .replace(/Ã³/g, "ó")
    .replace(/Ãº/g, "ú")
    .replace(/Ã±/g, "ñ")
    .replace(/Ã¼/g, "ü")
    .replace(/Ã/g, "Á")
    .replace(/Â/g, "")
    .replace(/NÂ°/g, "N°")
    .replace(/ã/g, "í")
    .replace(/í¡/g, "á")
    .replace(/í³/g, "ó")
    .replace(/âª/g, "ª")
    .replace(/Nâ°/g, "N°");

  return textoCorregido;
};

export default corregirCodificacion;
