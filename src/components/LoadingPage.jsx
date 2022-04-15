import React from "react";
import PropTypes from "prop-types";

import Loading from "./Loading";

LoadingPage.propTypes = { page: PropTypes.node.isRequired };

export default function LoadingPage(props) {
	const loadingFrame =
		<div className="fixed top-0 left-0 right-0 h-screen w-screen flex justify-center bg-black/10">
			<div className="place-self-center">
				<Loading />
			</div>
		</div>;

	return (
		<React.Suspense fallback={loadingFrame}>
			{props.page}
		</React.Suspense>
	);
}
