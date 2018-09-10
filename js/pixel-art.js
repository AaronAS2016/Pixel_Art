var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

// Variable para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
let $colorPersonalizado = $('#color-personalizado'),
    $paleta = $('#paleta'),
    $griillaPixeles = $('#grilla-pixeles'),
    $indicadorDeColor = $('#indicador-de-color'),
    $batman = $("#batman"),
    $wonder = $("#wonder"),
    $flash = $("#flash"),
    $botonGuardar = $("#guardar"),
    $invisible = $("#invisible"),
    apretado = false,
    estadoDelCursor = "Lapiz";


$colorPersonalizado.on('change', 
  (function() {
    // Se guarda el color de la rueda en colorActual
    colorActual = $colorPersonalizado.val();
    // Completar para que cambie el indicador-de-color al colorActual
    $indicadorDeColor.css('background-color', colorActual);
  })
);


const generarPaleta = paleta =>{
  let paletaColor;
  for(color of nombreColores){
    paletaColor = $('<div>',{
      'class' : 'color-paleta'
    }).css('background-color', color);
    paleta.append(paletaColor)
  }
}


const generarGrilla = grilla =>{
  for(i = 0; i < 1749; i++){
    grilla.append($('<div>',{
      'class' : 'pixel'
    }));
  }
}


const obtenerColor = () => $indicadorDeColor.css('background-color')

const cambiarColorIndicador = (e, indicadorColor) => {
  let color = e.target.style.backgroundColor;
  indicadorColor.css('background-color', color);
}

const pintarPixel = (e, color) =>{
  e.target.style.backgroundColor = color;
}

const pintarEnMovimiento = (e) => {
  if(apretado){
    switch(estadoDelCursor){
      case "Lapiz":
        pintarPixel(e, obtenerColor())
        break
      case "Borrador":
        pintarPixel(e, "#fff")
        break
    } 
  }
}

const borrarPantalla = grilla => {
  let pixeles = grilla.children();
  $($(pixeles)).animate({"background-color": "#fff"}, 1000);
}

const cambiarCursor = cursor =>{
  $griillaPixeles.removeClass();
  $griillaPixeles.addClass(cursor);
}

const cambiarEstado = estado => {
  switch(estado){
    case "Lapiz":
      setearPincel();
      break
    case "Borrador":
      setearBorrador();
      break
    case "Gotero":
      setearGotero();
      break
  }
}

const setearPincel = () =>{
  cambiarCursor("cursor-lapiz");
  estadoDelCursor = "Lapiz";
}

const setearBorrador = () => {
  cambiarCursor("cursor-borrador");
  estadoDelCursor = "Borrador";
}

const setearGotero = () => {
  cambiarCursor("cursor-gotero");
  estadoDelCursor = "Gotero";
}

generarGrilla($griillaPixeles)
generarPaleta($paleta)
$colorPaleta = $('.color-paleta');
$pixelDeLaGrilla = $('.pixel');
$botonBorrarPantalla = $('#borrar');
$borrador = $("#borrador");
$gotero = $("#gotero");
$lapiz = $("#lapiz");
$colorPaleta.click((e) => {
  cambiarColorIndicador(e, $indicadorDeColor)
  setearPincel()
})
$pixelDeLaGrilla.click( (e) => {
  switch(estadoDelCursor){
    case "Lapiz":
      pintarPixel(e, obtenerColor())
      break
    case "Borrador":
      pintarPixel(e, "#fff")
      break
    case "Gotero":
      cambiarColorIndicador(e, $indicadorDeColor)
      setearPincel()
      $lapiz.addClass("active");
      $gotero.removeClass("active");
      break
  }
});

$griillaPixeles.mousedown(() => apretado = true)
$(window).mouseup (() => apretado = false);
$botonBorrarPantalla.click(() => borrarPantalla($griillaPixeles))
$griillaPixeles.mousemove((e) => pintarEnMovimiento(e));

$batman.click(()=>{cargarSuperheroe(batman)})
$wonder.click(()=>{cargarSuperheroe(wonder)})
$flash.click(()=>{cargarSuperheroe(flash)})
$invisible.click(()=>{cargarSuperheroe(invisible)})

$botonGuardar.click(guardarPixelArt);

$borrador.click(() => {
  cambiarEstado("Borrador")
  $borrador.addClass("active");
  $lapiz.removeClass("active");
  $gotero.removeClass("active");
})
$lapiz.click(()=> {
  cambiarEstado("Lapiz")
  $lapiz.addClass("active");
  $borrador.removeClass("active");
  $gotero.removeClass("active");
})
$gotero.click(()=> {
  cambiarEstado("Gotero")
  $gotero.addClass("active");
  $borrador.removeClass("active");
  $lapiz.removeClass("active");
})


