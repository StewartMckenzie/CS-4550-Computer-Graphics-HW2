'use strict';

let gl;
let vertexNum = 3;
let points;
points = new Float32Array([-1, -1, 0, 0, 1, -1]);
window.onload = function init() {
  let canvas = document.getElementById('gl-canvas');
  gl = canvas.getContext('webgl2');
  if (!gl) {
    alert("WebGL 2.0 isn't available");
  }
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  canvas.addEventListener('click', function () {
    vertexNum++;
    if (vertexNum == 4) new Float32Array([1, 1, 1, -1, -1, -1, -1, 1]);
    if (vertexNum == 5) {
      points = new Float32Array([1, 1, 1, -1, 0, 0, -1, -1, -1, 1]);
    } else {
      vertexNum = 3;
      points = new Float32Array([-1, -1, 0, 0, 1, -1]);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
    render();
  });

  //
  //  Initialize our data for a single triangle
  //

  //
  //  Configure WebGL
  //

  //  Load shaders and initialize attribute buffers

  let program = initShaders(gl, 'vertex-shader', 'fragment-shader');
  gl.useProgram(program);

  // Load the data into the GPU

  let bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);

  // Associate out shader letiables with our data buffer

  let aPosition = gl.getAttribLocation(program, 'aPosition');
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  render();
};

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLE_FAN, 0, vertexNum);
}
