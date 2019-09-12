import * as React from 'react';
import styles from './SearchFilter.module.scss';
import { ISearchFilterProps } from './ISearchFilterProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { IFrameDialog } from "@pnp/spfx-controls-react/lib/IFrameDialog";
import { Version, Environment, EnvironmentType, ServiceScope, Log, Text } from "@microsoft/sp-core-library";
import { SPComponentLoader } from "@microsoft/sp-loader";

const EXP_SOURCE: string = "SPFxDirectory";
//"914330ee-2df2-4f6e-a858-30c23a812408";//
const LIVE_PERSONA_COMPONENT_ID: string = "b7dd04e1-19ce-4b24-9132-b60a1c2b910d";
export interface IPersonaCardState {

  livePersonaCard: any;

  pictureUrl: string;

}
export default class SearchFilter extends React.Component<ISearchFilterProps,
IPersonaCardState> {
  constructor(props: ISearchFilterProps) {
    super(props);
    this.state = {
      livePersonaCard: undefined, pictureUrl: undefined
    };
  }

  public async componentDidMount() {

    const sharedLibrary = await this._loadSPComponentById(LIVE_PERSONA_COMPONENT_ID);
    const livePersonaCard: any = sharedLibrary.default;
    console.log(livePersonaCard);
    this.setState({ livePersonaCard: livePersonaCard });
  }

  private async _loadSPComponentById(componentId: string): Promise<any> {
    try {
      const component: any = await SPComponentLoader.loadComponentById(componentId);
      return component;
    } catch (error) {
      Promise.reject(error);
      Log.error(EXP_SOURCE, error, this.props.context.serviceScope);
    }
  }
  private _LivePersonaCard() {

    return React.createElement(
      this.state.livePersonaCard
    );

  }
  public render(): React.ReactElement<ISearchFilterProps> {
    return (
      <div>
      <iframe src="https://khetan1.sharepoint.com/:p:/s/TestDemo/EQlGN8l8rLRNmvGbb5PVFrIB5Wua3_1hK5LuXP29I6bMKw?e=xDckKo"></iframe>
      </div>
    );
  }
}



