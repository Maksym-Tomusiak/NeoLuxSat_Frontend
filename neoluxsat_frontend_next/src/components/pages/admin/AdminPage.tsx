import ApplicationsChart from "./Dashboard/Charts/ApplicationsChart";
import ApplicationsByStatusComponent from "./Dashboard/ApplicationStatus/ApplicationsByStatusComponent";
import ApplicationsByTypeComponent from "./Dashboard/ApplicationType/ApplicationsByTypeComponent";
import LatestApplicationsTable from "./Dashboard/LatestApplications/LatestApplicationsTable";
import RepairsChart from "./Dashboard/Charts/RepairsChart";
import LatestRepairsTable from "./Dashboard/LatestRepairs/LatestRepairsTable";

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-[24px]">
      <h1 className="font-manrope font-semibold text-[24px]/[90%] text-primaryBlue font-semibold pl-[24px]">
        Інформаційна панель
      </h1>
      <div className="flex flex-col lg:flex-row gap-[20px] items-center justify-center">
        <div className="flex flex-col lg:flex-row gap-[20px] max-lg:items-center w-full">
          <ApplicationsByTypeComponent />
          <ApplicationsByStatusComponent />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-[20px] items-start justify-between w-full mb-[16px] max-w-[1380px] mx-auto">
        <div className="flex-1 min-w-0 max-lg:w-full">
          <ApplicationsChart />
        </div>
        <div className="flex-1 min-w-0 max-lg:w-full">
          <LatestApplicationsTable />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-[20px] items-start justify-between w-full mb-[16px] max-w-[1380px] mx-auto">
        <div className="flex-1 min-w-0 max-lg:w-full">
          <RepairsChart />
        </div>
        <div className="flex-1 min-w-0 max-lg:w-full">
          <LatestRepairsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
