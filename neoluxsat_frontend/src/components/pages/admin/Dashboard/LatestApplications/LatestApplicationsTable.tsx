import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/dashboard-table';
import { ApplicationService } from '@/services/application.service';

import UserIcon from '@/assets/svgs/admin/dashboard/person-icon.svg';
import StatusIcon from '@/assets/svgs/admin/dashboard/status-icon.svg';
import DateIcon from '@/assets/svgs/admin/dashboard/date-icon.svg';
import ActionsIcon from '@/assets/svgs/admin/dashboard/actions-icon.svg';
import OptionsIcon from '@/assets/svgs/admin/dashboard/options-icon.svg';
import type { ApplicationDto } from '@/types/application';

const getStatusStyles = (status: string = '') => {
  const statusLower = status?.toLowerCase();
  switch (statusLower) {
    case 'відхилена':
    case 'скасована':
      return 'bg-iconsRed/20 border border-iconsRed/80';
    case 'завершена':
      return 'bg-iconsGreen/20 border border-iconsGreen/80';
    case 'виконується':
      return 'bg-iconsBlue/20 border border-iconsBlue/80';
    case 'нова':
    default:
      return 'bg-primaryOrange/20 border border-primaryOrange/80';
  }
};

const LatestApplicationsTable: React.FC = () => {
  const [applications, setApplications] = useState<ApplicationDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    ApplicationService.getLatestApplications(4, controller.signal)
      .then((data: ApplicationDto[]) => {
        setApplications(data);
      })
      .catch((error: any) => {
        console.error('Failed to fetch latest applications:', error);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const formatDate = (date: Date | string): string => {
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return String(date);
      return d.toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'Europe/Kyiv',
      });
    } catch {
      return String(date);
    }
  };

  if (loading) {
    return (
      <div className="w-full lg:flex-1 bg-primaryBlue/10 rounded-[20px] p-4 text-primaryBlue min-h-[380px] flex items-center justify-center shadow-sm">
        Завантаження останніх заявок...
      </div>
    );
  }

  return (
    <div className="w-full max-lg:min-w-full lg:flex-1 max-w-[680px] bg-primaryBlue/10 rounded-[20px] px-[12px] pt-[24px] pb-[12px] min-h-[380px]">
      <h2 className="text-[18px]/[120%] font-semibold font-noto tracking-[-0.36px] text-primaryBlue mb-[24px] pl-[12px]">
        Останні заявки
      </h2>
      <div>
        <Table>
          <TableHeader className="pb-[16px]">
            <TableRow className="border-b-0">
              <TableHead className="text-primaryBlue">
                <div className="flex gap-[6px] items-center pl-[12px]">
                  <UserIcon />
                  <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
                    ПІБ
                  </p>
                </div>
              </TableHead>
              <TableHead className="text-primaryBlue">
                <div className="flex gap-[6px] items-center">
                  <StatusIcon />
                  <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
                    Статус
                  </p>
                </div>
              </TableHead>
              <TableHead className="text-primaryBlue">
                <div className="flex gap-[6px] items-center">
                  <DateIcon />
                  <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
                    Дата створення
                  </p>
                </div>
              </TableHead>
              <TableHead className="text-primaryBlue text-right">
                <div className="flex gap-[6px] items-center justify-end pr-[12px]">
                  <ActionsIcon />
                  <p className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal">
                    Дії
                  </p>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length > 0 ? (
              applications.map((app) => (
                <TableRow
                  key={app.id}
                  className="bg-primaryWhite rounded-[10px] h-[60px] transition-shadow duration-200 shadow-none hover:shadow-md border-b-0 hover:bg-muted/50 data-[state=selected]:bg-muted"
                  style={{ marginBottom: '8px' }}
                >
                  <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue py-3 rounded-l-[10px]">
                    {app.fullName}
                  </TableCell>
                  <TableCell className="p-0">
                    <span
                      className={`inline-flex justify-start px-[10px] py-[8px] rounded-full ${getStatusStyles(
                        app.status?.title
                      )}`}
                    >
                      <p className="font-noto text-[14px]/[120%] tracking-[-0.28px] font-normal text-primaryBlue">
                        {app.status?.title}
                      </p>
                    </span>
                  </TableCell>
                  <TableCell className="font-noto text-[16px]/[120%] tracking-[-0.32px] font-normal text-primaryBlue p-0">
                    {formatDate(app.createdAt)}
                  </TableCell>
                  <TableCell className="text-right pr-[18px] rounded-r-[10px]">
                    <button className="hover:cursor-pointer">
                      <OptionsIcon />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-gray-500"
                >
                  Немає останніх заявок.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LatestApplicationsTable;
