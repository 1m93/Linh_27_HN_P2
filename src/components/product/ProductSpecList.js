import React from 'react'

function ProductSpecList(props) {
    return (
			<div className="spec">
				<div className="spec__title">{props.title}</div>
				<div className="spec__list">
					<div className="spec__list-item">
						<p>Processor</p>
						<span>{props.processor}</span>
					</div>
					<div className="spec__list-item">
						<p>Memory</p>
						<span>{props.memory} GB</span>
					</div>
					<div className="spec__list-item">
						<p>Storage</p>
						<span>{props.storage} GB available space</span>
					</div>
					<div className="spec__list-item">
						<p>Graphics</p>
						<span>{props.graphics}</span>
					</div>
				</div>
			</div>
		);
}

export default ProductSpecList
