function Repl( el ){
  this.el = el;
  this.build();
}

Repl.prototype.build = function(){
  this.input = document.createElement("input");
  this.toEval = document.createElement("div");
  this.toEval.className = 'eval';
  this.toEval.appendChild( this.input );
  this.el.appendChild( this.toEval );
  this.input.focus();
  this.bindUI();
}

Repl.prototype.bindUI = function(){
  this.input.addEventListener('keyup', function( event ){
    if( event.keyCode == 13){
      this.eval();
      this.input.value = '';
    }
  }.bind( this ));
}

Repl.prototype.eval = function(){
  var evaled = document.createElement("div");
  evaled.innerHTML = this.input.value;
  evaled.className = 'eval';
  this.el.appendChild( evaled );
  var returned = document.createElement("div");
  try {
    returned.innerHTML = eval( this.input.value );
  } catch (e) {
    returned.innerHTML = e;
    returned.className = 'error';
  }
  this.el.appendChild( returned );
  this.input.parentNode.parentNode.removeChild( this.toEval );
  this.build();
}
