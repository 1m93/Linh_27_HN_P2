import { LinearProgress } from "@material-ui/core";
import React from "react";
import Chart from "react-google-charts";

function Dashboard() {
	return (
		<div className="Dashboard">
			<div style={{ display: "flex", maxWidth: 900 }}>
				<Chart
					width={400}
					height={300}
					chartType="ColumnChart"
					loader={<LinearProgress className="loadingbar" />}
					data={[
						["City", "2010 Population", "2000 Population"],
						["New York City, NY", 8175000, 8008000],
						["Los Angeles, CA", 3792000, 3694000],
						["Chicago, IL", 2695000, 2896000],
						["Houston, TX", 2099000, 1953000],
						["Philadelphia, PA", 1526000, 1517000],
					]}
					options={{
						title: "Population of Largest U.S. Cities",
						chartArea: { width: "30%" },
						hAxis: {
							title: "Total Population",
							minValue: 0,
						},
						vAxis: {
							title: "City",
						},
					}}
					legendToggle
				/>
			</div>
		</div>
	);
}

export default Dashboard;
