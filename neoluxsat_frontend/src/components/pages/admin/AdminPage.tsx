import ApplicationsChartComponent from './Dashboard/ApplicationsChart/ApplicationsChartComponent';
import ApplicationsByStatusComponent from './Dashboard/ApplicationStatus/ApplicationsByStatusComponent';
import ApplicationsByTypeComponent from './Dashboard/ApplicationType/ApplicationsByTypeComponent';
import LatestApplicationsTable from './Dashboard/LatestApplications/LatestApplicationsTable';

const AdminPage = () => {
  return (
    <div className="flex flex-col gap-[24px]">
      <h1 className="font-manrope font-semibold text-[24px]/[90%] text-primaryBlue font-semibold pl-[24px]">
        Інформаційна панель
      </h1>
      <div className="flex flex-col lg:flex-row gap-[20px] items-center justify-center">
        <div className="flex flex-col lg:flex-row gap-[20px] max-lg:items-center">
          <ApplicationsByTypeComponent />
          <ApplicationsByStatusComponent />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-[20px] items-start justify-center w-full mb-[16px]">
        <ApplicationsChartComponent />
        <LatestApplicationsTable />
      </div>
    </div>
  );
};

export default AdminPage;
