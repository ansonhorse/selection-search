

function SelectionUtil(options){

    this.getRawSelection = function(){
        return window.getSelection().toString();
    }

    this.getSelection = function(){
        let selection = window.getSelection().toString().trim();
        if (options.selection_allow_newline){
            return selection.replace(/\n/g, ' ');
        }
        return selection;
    }

    this.hasSelection = function(){

        var sel = this.getSelection();

        if (sel.length == 0)
            return false;

        if (options.selection_length_limit >= 0){
            if(sel.length > options.selection_length_limit){
                return false;
            }
        }

        if (options.selection_allow_newline){
            return true;
        }

        return sel.indexOf("\n") == -1;
    }

    this.getSelectionRect = function(){
        var range = window.getSelection().getRangeAt(0);
        if(range){
            return range.getBoundingClientRect();
        }
        return undefined;
    }

    this.isPointOnSelection = function(x, y){

        var rx = window.pageXOffset;
        var ry = window.pageYOffset;

        var rect = this.getSelectionRect();

        if(rect){
            rx += rect.left;
            ry += rect.top;
        }

        if ((y >= ry && y <= ry + rect.height && x >= rx && x <= rx + rect.width)){
            return true;
        }
        return false;

    }
}

