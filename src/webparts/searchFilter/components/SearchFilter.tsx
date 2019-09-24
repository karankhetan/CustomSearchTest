import * as React from 'react';
import styles from './SearchFilter.module.scss';
import { ISearchFilterProps } from './ISearchFilterProps';
import { IFrameDialog } from "@pnp/spfx-controls-react/lib/IFrameDialog";
import { List } from 'office-ui-fabric-react';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import "office-ui-fabric-react/lib/components/SearchBox/examples/SearchBox.Examples.scss";
import "office-ui-fabric-react/lib/components/Callout/examples/CalloutExample.scss";
import { sp, SearchSuggestQuery, SearchSuggestResult, SearchResults,SearchQuery } from "@pnp/sp";

const EXP_SOURCE: string = "SPFxDirectory";

const LIVE_PERSONA_COMPONENT_ID: string = "b7dd04e1-19ce-4b24-9132-b60a1c2b910d";//"b7dd04e1-19ce-4b24-9132-b60a1c2b910d";
export interface IPersonaCardState {

  livePersonaCard: any;
  isCalloutVisible?: boolean;
  pictureUrl: string;
  flag: boolean;
  searchResults:any[];

}
export default class SearchFilter extends React.Component<ISearchFilterProps,
  IPersonaCardState> {
  private _menuButtonElement: HTMLElement | null;
  private listReference = [];


  constructor(props: ISearchFilterProps) {
    super(props);
    this.state = {
      livePersonaCard: undefined, pictureUrl: undefined, flag: false,
      isCalloutVisible: false,
      searchResults:[]

    };
  }

  private _onCalloutDismiss = (): void => {
    this.setState({
      isCalloutVisible: false
    });
  };

  private _onShowMenuClicked = (): void => {
    // console.log(this._menuButtonElement);
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  };

  public _onMouseEnter(index) {
    this._menuButtonElement = this.listReference[index];
    this._onShowMenuClicked();
  }

  public _onRenderCell(item, index) {
    // if(this.listReference.length<=index){
    // this.listReference.push(null);}
    return (
      <div className="ms-CalloutExample-buttonArea" ref={ref => (this.listReference[index] = ref)} style={{ height: "30px" }}>
        <div style={{ height: "30px" }} onMouseEnter={this._onMouseEnter.bind(this, index)}>{item}</div>
      </div>
    );
  }
public _onSearchCalled(value){
console.log(value);
  sp.search({
    Querytext: "test",
    RowLimit: 10,
    sourceId: "e7ec8cee-ded8-43c9-beb5-436b54b31e84"
}).then((r:SearchResults)=>{
    console.log(r);
  });


}

public _onSearchSuggest(value){
  // console.log(value)
  // sp.searchSuggest(value).then((r:SearchSuggestResult)=>{
  //   console.log(r);
  // });
}


  public render(): React.ReactElement<ISearchFilterProps> {
    var flag = true;
    const abc = (<iframe width="500" height="350" src="https://khetan1.sharepoint.com/sites/TestDemo/_layouts/15/Doc.aspx?sourcedoc={3bad1fbe-d48a-4353-8dff-fcaf57f48ed4}&action=interactivepreview"></iframe>);
    return (
      <div>
        
        <div>
          <SearchBox 
          placeholder="search"
          onSearch={this._onSearchCalled.bind(this)}
          onChange={this._onSearchSuggest.bind(this)}
          />
        </div>



        <List
          items={["test1", "test2", "test3", "test4", "test5", "test6"]}
          onRenderCell={this._onRenderCell.bind(this)}
        />
        <div className="ms-CalloutExample-buttonArea" ref={menuButton => (this._menuButtonElement = menuButton)}>
          <DefaultButton
            className={'calloutExampleButton'}
            onClick={this._onShowMenuClicked}
            text={this.state.isCalloutVisible ? 'Hide callout' : 'Show callout'}
          />
        </div>
        {this.state.isCalloutVisible ? (
          <Callout
            //className="ms-CalloutExample-callout"
            gapSpace={5}
            target={this._menuButtonElement}
            isBeakVisible={true}
            beakWidth={12}
            onDismiss={this._onCalloutDismiss}
            directionalHint={DirectionalHint.rightCenter}
          >
            <div>
              {abc}
            </div>
          </Callout>
        ) : null}

      </div>
    );
  }
}



