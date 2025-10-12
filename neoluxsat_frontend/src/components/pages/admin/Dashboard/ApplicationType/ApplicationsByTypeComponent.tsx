import { useEffect, useState } from 'react';
import { ApplicationService } from '@/services/application.service';
import { ApplicationTypeService } from '@/services/applicationType.service';
import type { ApplicationTypeDto } from '@/types/application';
import ApplicationTypeCard from './ApplicationTypeCard';

interface ApplicationsByTypeData {
  [typeTitle: string]: number;
}

const ApplicationsByTypeComponent = () => {
  const applicationTypes = ['інтернет', 'телебачення', 'безпек', 'iot'];

  const [applicationsData, setApplicationsData] =
    useState<ApplicationsByTypeData>({});
  const [types, setTypes] = useState<ApplicationTypeDto[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    ApplicationService.getApplicationsCountByTypes(controller.signal)
      .then(setApplicationsData)
      .catch(console.error);

    ApplicationTypeService.getAllApplicationTypes(controller.signal)
      .then((data) => {
        let fitered = data.filter((type) =>
          applicationTypes.some((title) =>
            type.title.toLowerCase().includes(title.toLowerCase())
          )
        );
        setTypes(fitered);
      })
      .catch(console.error);

    return () => controller.abort();
  }, []);

  return (
    <div className="text-primaryWhite w-full lg:flex-1">
      <div className="flex flex-wrap gap-[20px] justify-center items-center">
        {types.map((type) => (
          <ApplicationTypeCard
            key={type.id}
            type={type}
            count={applicationsData[type.title] || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default ApplicationsByTypeComponent;
