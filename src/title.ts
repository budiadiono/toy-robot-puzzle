import * as blessed from "blessed";

export class Title {
  private box: blessed.Widgets.BoxElement;

  constructor(screen: blessed.Widgets.Node) {
    this.box = blessed.box({
      right: 2,
      top: 0,
      width: 65,
      height: 12,
      content: title,
    });

    screen.append(this.box);
  }
}

const title = `                                                                
_____            _____     _       _                      _     
|_   _|___ _ _   | __  |___| |_ ___| |_    ___ _ _ ___ ___| |___ 
 | | | . | | |  |    -| . | . | . |  _|  | . | | |- _|- _| | -_|
 |_| |___|_  |  |__|__|___|___|___|_|    |  _|___|___|___|_|___|
         |___|                           |_|                    
`;
