import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default class ColoredScrollbars extends Component {

	constructor(props, ...rest) {
		super(props, ...rest);
		this.renderThumb = this.renderThumb.bind(this);
	}

	renderThumb({ style, ...props }) {
		const thumbStyle = {
			backgroundColor: '#61dafb'
		};
		return (
			<div
				style={{ ...style, ...thumbStyle }}
				{...props}/>
		);
	}

	render() {
		return (
			<Scrollbars
				autoHide
				autoHideTimeout={50}
				autoHideDuration={200}
				hideTracksWhenNotNeeded={true}
				renderThumbHorizontal={this.renderThumb}
				renderThumbVertical={this.renderThumb}
				{...this.props}/>
		);
	}
}