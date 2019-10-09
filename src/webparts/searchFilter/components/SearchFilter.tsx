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
import { sp, SearchSuggestQuery, SearchSuggestResult, SearchResults, SearchQuery } from "@pnp/sp";

const EXP_SOURCE: string = "SPFxDirectory";

const LIVE_PERSONA_COMPONENT_ID: string = "b7dd04e1-19ce-4b24-9132-b60a1c2b910d";//"b7dd04e1-19ce-4b24-9132-b60a1c2b910d";
export interface IPersonaCardState {

  livePersonaCard: any;
  isCalloutVisible?: boolean;
  pictureUrl: string;
  flag: boolean;
  searchResults: any[];
  ServerRedirectedEmbedURL: string;


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
      searchResults: [], ServerRedirectedEmbedURL: ""
    };
  }

componentDidMount(){
  document.getElementById("workbenchPageContent").setAttribute("style", "max-width: 100%;");
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

  public _onMouseEnter(index, item) {
    this._menuButtonElement = this.listReference[index];
    this.setState({ ServerRedirectedEmbedURL: item.ServerRedirectedEmbedURL })
   // console.log(item)
    this._onShowMenuClicked();
  }

  public _onRenderCell(item, index) {
    // if(this.listReference.length<=index){
    // this.listReference.push(null);}
    return (
      <div className={`ms-ms-CalloutExample-buttonArea ${styles.Listitem}`} ref={ref => (this.listReference[index] = ref)} style={{ height: "30px" }}>
        <div style={{ height: "30px" }}  onClick={this._onMouseEnter.bind(this, index, item)}>{item.Title}</div>
      </div>
    );
  }
  public _onSearchCalled(value) {
    //console.log(value);

    var searchFilters = {
      Querytext: value,
      RowLimit: 4,
      SelectProperties: ['Title', 'ServerRedirectedEmbedURL', 'Path'],
      TrimDuplicates: false,
      Properties: [{
        Name: "EnableDynamicGroups",
        Value: {
          BoolVal: true,
          QueryPropertyValueTypeIndex: 3
        }
      }]
    };

    sp.search(searchFilters).then((r: SearchResults) => {
      let arrayOfResults = [];
      //    console.log(r.PrimarySearchResults);
      r.PrimarySearchResults.map((res) => {
        let newObj = { Title: res.Title, ServerRedirectedEmbedURL: res.ServerRedirectedEmbedURL, Path: res.Path };
        arrayOfResults.push(newObj);
      });
      this.setState({ searchResults: arrayOfResults });
    });
  }


  public render(): React.ReactElement<ISearchFilterProps> {
    var flag = true;
    const abc = (<iframe width="100%" height="350" src={this.state.ServerRedirectedEmbedURL}></iframe>);
    return (
      <div>

        <div>
          <SearchBox
            placeholder="search"
            onSearch={this._onSearchCalled.bind(this)}
          />
        </div>
        <div className={styles.GridRow}>
          <div id="refiners" className={styles.GridColumnleft}></div>
          <div id="searchResults" className={styles.GridColumnCenter}>
            <List
              items={this.state.searchResults}//{["test1", "test2", "test3", "test4", "test5", "test6"]}
              onRenderCell={this._onRenderCell.bind(this)}
            />
          </div>
          <div id="searchResultPreview" className={styles.GridColumnRight}>
            {this.state.isCalloutVisible ? (
              <div>
                {abc}
              </div>
            ) : null}
          </div>

        </div>
        {/* <div className="ms-CalloutExample-buttonArea" ref={menuButton => (this._menuButtonElement = menuButton)}>
          <DefaultButton
            className={'calloutExampleButton'}
            onClick={this._onShowMenuClicked}
            text={this.state.isCalloutVisible ? 'Hide callout' : 'Show callout'}
          />
        </div> */}
        {/* {this.state.isCalloutVisible ? (
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
        ) : null} */}

      </div>
    );
  }
}



