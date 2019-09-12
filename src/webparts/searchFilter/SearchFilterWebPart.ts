import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SearchFilterWebPartStrings';
import SearchFilter from './components/SearchFilter';
import { ISearchFilterProps } from './components/ISearchFilterProps';
import { Guid } from '@microsoft/sp-core-library'
import {  IWebPartData } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';
import { IClientSideWebPartManifest } from '@microsoft/sp-module-interfaces';
import {
  sp,
  ClientSideWebpart,
  ClientSideWebpartPropertyTypes,
  ClientSidePage,
  ClientSideText,
} from "@pnp/sp";


export interface ISearchFilterWebPartProps {
  description: string;
}



export default class SearchFilterWebPart extends BaseClientSideWebPart<ISearchFilterWebPartProps> {

  webpar;

  async loadwebpart():Promise<any>{
   return new Promise(async (resolve)=>{
    let webartid="b7dd04e1-19ce-4b24-9132-b60a1c2b910d";
    const partDefs = await sp.web.getClientSideWebParts();
    const partDef = partDefs.filter(c => c.Id === webartid);
   
  const part = ClientSideWebpart.fromComponentDef(partDef[0]);
  part.setProperties({
				file: "https://khetan1.sharepoint.com/sites/TestDemo/Shared%20Documents/CSU%20Updates.pptx"
});
      resolve(part);
    });
  
  
//   const part = ClientSideWebpart.fromComponentDef(partDef[0]);
//   part.setProperties({
// 				file: "https://khetan1.sharepoint.com/sites/TestDemo/Shared%20Documents/CSU%20Updates.pptx"
// });

  }

  public render(): void {
    const element: React.ReactElement<ISearchFilterProps > = React.createElement(
      SearchFilter,
      {
        description: this.properties.description,
        context:this.context
      }
    );
    
   let element2;
    this.loadwebpart().then((res)=>{
      element2= React.createElement(res);
      console.log(element);
      console.log(element2);
      //ReactDom.render(res, this.domElement);
    });
   

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
