import React, { Component, useState } from 'react';

import {
     __experimentalNumberControl as NumberControl,
     __experimentalBoxControl as BoxControl,
     __experimentalUnitControl as UnitControl,
     __experimentalInputControl as InputControl,
} from '@wordpress/components';

const {
     RichText,
     InspectorControls,
     ColorPalette,
     MediaUpload,
     MediaUploadCheck
} = wp.blockEditor;
const {
     PanelBody,
     ColorPicker,
     SelectControl,
     Button,
     RangeControl,
     GradientPicker

} = wp.components;

export default class SE2_container extends Component {

     constructor(props) {
          super(props)
          console.log('props: -> ', props)
          if (Object.values(this.props.styleProps).length > 0) {
               this.state = this.props.styleProps
          }

     }


     changeSettings(v, k) {
          this.setState(
               (prevState) => {
                    var newState = Object.assign({}, prevState);
                    newState[k] = v
                    return newState;
               },
               () => { this.props.styleHandler(this.state, this.props.containerStyle) }
          )
     }

     UNSAFE_componentDidMount() {
          this.changeSettings(this.props.containerStyle, 'style')
     }



     render() {

          /* SET CSS TAGS */

          var margin = '0px'
          if (this.state.margin.top) {
               margin = this.state.margin.top + ' ' + this.state.margin.right + ' ' + this.state.margin.bottom + ' ' + this.state.margin.left
          }
          var padding = '0px'
          if (this.state.padding.top) {
               padding = this.state.padding.top + ' ' + this.state.padding.right + ' ' + this.state.padding.bottom + ' ' + this.state.padding.left
          }
          var backgroundImage = 'none'
          if (this.state.backgroundImage !== 'none') {
               backgroundImage = `url(${this.state.backgroundImage.sizes.full.url})`
          }
          var borderWidth = '0px'
          if (this.state.borderWidth.top) { /* && this.state.clipPath === 'none'*/
               borderWidth = this.state.borderWidth.top + ' ' + this.state.borderWidth.right + ' ' + this.state.borderWidth.bottom + ' ' + this.state.borderWidth.left
          }
          var borderRadius = '0px'
          if (this.state.borderRadius.top) {
               borderRadius = this.state.borderRadius.top + ' ' + this.state.borderRadius.right + ' ' + this.state.borderRadius.bottom + ' ' + this.state.borderRadius.left
          }
          var backgroundImage = 'none'
          if (this.state.backgroundImage !== 'none') {
               backgroundImage = `url(${this.state.backgroundImage.sizes.full.url})`
          }
          var clipPath = 'unset';
          var filter;
          if (this.state.clipPath !== 'none') {
               clipPath = `polygon(${this.state.clipPath})`;
               /*
               if (this.state.borderRadius.top) {
                    filter = `drop-shadow(${this.state.borderWidth.top} 0px 0px ${this.state.borderColor})
                              drop-shadow(-${this.state.borderWidth.top} 0px 0px ${this.state.borderColor})
                              drop-shadow(0px ${this.state.borderWidth.top} 0px ${this.state.borderColor})
                              drop-shadow(0px -${this.state.borderWidth.top} 0px ${this.state.borderColor})
                              drop-shadow(${this.state.borderWidth.top} ${this.state.borderWidth.top} 0px ${this.state.borderColor})
                              drop-shadow(-${this.state.borderWidth.top} -${this.state.borderWidth.top} 0px ${this.state.borderColor})
                              drop-shadow(${this.state.borderWidth.top} -${this.state.borderWidth.top} 0px ${this.state.borderColor})
                              drop-shadow(-${this.state.borderWidth.top} ${this.state.borderWidth.top} 0px ${this.state.borderColor})`
               } */
          }


          var video = this.state.video ? this.state.video : 'false'

          this.props.containerStyle =
          {
               overflow: 'hidden',
               position: 'relative',
               height: 'auto',
               width: this.state.width,

               minHeight: this.state.minHeight,

               margin: margin,
               padding: padding,

               background: this.state.background,
               backgroundColor: this.state.backgroundColor,
               backgroundImage: backgroundImage,
               backgroundSize: this.state.backgroundSize,
               backgroundRepeat: this.state.backgroundRepeat,
               backgroundAttachment: this.state.backgroundAttachment,
               backgroundPosition: this.state.backgroundPosition,

               borderWidth: borderWidth,
               borderStyle: this.state.borderStyle,
               borderColor: this.state.borderColor,
               borderRadius: borderRadius,

               clipPath: clipPath,

               filter: filter,

               video: video,

               opacity: this.state.opacity
          }


          return ([
               <div>
                    {/* ---------------- SETTINGS ---------------- */}
                    <InspectorControls style={{ marginBottom: '40px' }} >

                         {/* SIZE */}
                         <PanelBody title={'Size'} initialOpen={false} >
                              <UnitControl
                                   style={{ width: '48%', float: 'left', margin: '1%' }}
                                   onChange={(height) => this.changeSettings(height, 'minHeight')}
                                   onUnitChange={e => console.log("new unit")}
                                   label="Min. Height"
                                   isUnitSelectTabbable
                                   value={this.state.minHeight} />
                              <UnitControl
                                   style={{ width: '48%', float: 'left', margin: '1%' }}
                                   onChange={(width) => this.changeSettings(width, 'width')}
                                   onUnitChange={e => console.log("new unit")}
                                   label="Width"
                                   isUnitSelectTabbable
                                   value={this.state.width} />
                         </PanelBody>

                         {/* BACKGROUND */}
                         <PanelBody title={'Background'} initialOpen={false} >

                              {/* OPACITY */}
                              <RangeControl
                                   label={'Opacity'}
                                   value={this.state.opacity}
                                   onChange={(value) => this.changeSettings(value, 'opacity')}
                                   min={0}
                                   max={1}
                                   step={0.02}

                                   marks={[
                                        {
                                             value: 0.5,
                                             label: '50%',
                                        }
                                   ]}
                              />

                              {/* COLOR */}

                              <ColorPalette
                                   value={this.state.backgroundColor}
                                   onChange={(value) => this.changeSettings(value, 'backgroundColor')}
                              />

                              <GradientPicker
                                   value={this.state.background}
                                   onChange={(value) => this.changeSettings(value, 'background')}
                              />

                              {/* IMAGE */}
                              <p><strong>Background Image</strong></p>
                              <MediaUploadCheck style={{ margin: '40px 0' }}>
                                   <MediaUpload
                                        onSelect={(media) =>
                                             this.changeSettings(media, 'backgroundImage')
                                        }

                                        value={this.state.backgroundImage}
                                        render={({ open }) => (
                                             <div>
                                                  {
                                                       this.state.backgroundImage !== 'none'
                                                            ? <div style={{ margin: '20px 0', backgroundImage: `url(${this.state.backgroundImage.sizes.full.url})`, height: '100px', width: '100%', backgroundSize: 'cover' }}></div>
                                                            : <div style={{ margin: '20px 0', color: 'grey', backgroundColor: 'lightgrey', width: '100%', textAlign: 'center', padding: '10px' }}><strong>No Image</strong></div>
                                                  }

                                                  <Button isPrimary onClick={open}>Select Background Image</Button>
                                             </div>
                                        )}
                                   />
                              </MediaUploadCheck>
                              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '20px' }}>
                                   <SelectControl
                                        style={{ margin: '2%' }}
                                        label={'Background Size'}
                                        value={this.state.backgroundSize} // e.g: value = [ 'a', 'c' ]
                                        onChange={value => { this.changeSettings(value, 'backgroundSize') }}
                                        options={[
                                             { value: 'cover', label: 'Cover' },
                                             { value: 'auto', label: 'Auto' },
                                             { value: 'contain', label: 'contain' },
                                             { value: '100%', label: '100%' },
                                        ]}
                                   />
                                   <SelectControl
                                        style={{ margin: '2%' }}
                                        label={'Background Attechment'}
                                        value={this.state.backgroundAttachment} // e.g: value = [ 'a', 'c' ]
                                        onChange={value => { this.changeSettings(value, 'backgroundAttachment') }}
                                        options={[
                                             { value: 'scroll', label: 'Scroll' },
                                             { value: 'fixed', label: 'Fixed' },
                                             { value: 'local', label: 'Local' },
                                        ]}
                                   />
                              </div>

                              {/* video */}
                              <p><strong>Background Video</strong></p>
                              <p>webm bevorziehnd</p>
                              <MediaUploadCheck style={{ margin: '40px 0' }}>
                                   <MediaUpload
                                        onSelect={(media) =>
                                             this.changeSettings(media, 'video')
                                        }

                                        value={this.state.video !== 'false' ? this.state.video : 'false'}
                                        render={({ open }) => (
                                             <div>
                                                  {
                                                       this.state.video !== 'false'
                                                            ? <div style={{ margin: '20px 0', height: '100px', width: '100%', backgroundColor: 'lightgrey' }}>Link: this.state.video.url </div>
                                                            : <div style={{ margin: '20px 0', color: 'grey', backgroundColor: 'lightgrey', width: '100%', textAlign: 'center', padding: '10px' }}><strong>No Video</strong></div>
                                                  }

                                                  <Button isPrimary onClick={open}>Select a Video</Button>
                                             </div>
                                        )}
                                   />
                              </MediaUploadCheck>

                         </PanelBody>

                         {/* SPACING */}
                         <PanelBody title={'Spacing'} initialOpen={false}>
                              <BoxControl label="Margin" values={this.state.margin} onChange={value => { this.changeSettings(value, 'margin') }} style={{ width: '48%', float: 'left', margin: '1%' }} />
                              <BoxControl label="Padding" values={this.state.padding} onChange={value => { this.changeSettings(value, 'padding') }} style={{ width: '48%', float: 'left', margin: '1%' }} />
                         </PanelBody>

                         {/* BORDER */}
                         <PanelBody title={'Border'} initialOpen={false} >
                              <BoxControl label="Width" values={this.state.borderWidth} onChange={value => { this.changeSettings(value, 'borderWidth') }} />
                              <SelectControl
                                   label={'Border Style'}
                                   value={this.state.borderStyle} // e.g: value = [ 'a', 'c' ]
                                   onChange={value => { this.changeSettings(value, 'borderStyle') }}
                                   options={[
                                        { value: 'solid', label: 'Solid' },
                                        { value: 'dotted', label: 'Dotted' },
                                        { value: 'dashed', label: 'Dashed' },
                                        { value: 'double', label: 'Double' },
                                        { value: 'groove', label: 'Groove' },
                                        { value: 'ridge', label: 'Ridge' },
                                        { value: 'inset', label: 'Inset' },
                                        { value: 'outset', label: 'Outset' },
                                   ]}
                              />
                              <ColorPalette
                                   value={this.state.borderColor}
                                   onChange={(value) => this.changeSettings(value, 'borderColor')}
                              />
                              <BoxControl label="Corner Radius" values={this.state.borderRadius} onChange={value => { this.changeSettings(value, 'borderRadius') }} />
                         </PanelBody>

                         {/* SHAPE */}
                         <PanelBody title={'Shape'} initialOpen={false} >
                              <p><strong>Shape</strong></p>
                              <InputControl
                                   label="Clip Path"
                                   labelPosition="top"
                                   value={this.state.clipPath}
                                   type="text"
                                   isPressEnterToChange
                                   onChange={(value) => this.changeSettings(value, 'clipPath')}
                              />
                              <p>More infos and <a href="https://bennettfeely.com/clippy/" target="_blank"><b>presets</b></a></p>
                         </PanelBody>

                    </InspectorControls>

                    {/* ---------------- DISPLAY ---------------- */}
                    <div className="se2-container" style={this.props.containerStyle}>

                         {this.props.containerStyle.video
                              ?
                              <video class="background-video" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', height: '100%', width: '177.77777778vh', minWidth: '100%', minHeight: '56.25vw' }} autoplay loop muted playsinline>
                                   <source src={this.props.containerStyle.video.url} type={this.props.containerStyle.video.mime} ></source>
                              </video>
                              : ''
                         }
                         {this.props.children}

                    </div>
               </div>
          ])
     }
}