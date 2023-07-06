import { useState } from 'react';
import { useQuery } from '@apollo/client';
import UserSelectionList from './UserSelectionList';
import getAllGroups from '../../graphql/queries/getAllGroups';

function GroupSelection({ groupDefaultVal, assigneeDefaultVal, cb, sxStyles }) {
  const [group, setGroup] = useState();
  const [assignee, setAssignee] = useState();
  const { data, loading } = useQuery(getAllGroups, {
    onCompleted: (gData) => {
      if (groupDefaultVal) {
        const selectedGroup = gData.groups.filter(
          (grp) => grp.id === groupDefaultVal.id,
        );

        if (selectedGroup?.length !== 0) {
          setGroup(selectedGroup[0]);
          const user = selectedGroup[0].users.filter(
            (userA) => assigneeDefaultVal.name === userA.name,
          );
          setAssignee(user ? user[0] : '');
        }
      }
    },
  });

  const handleGroupChange = (changeGroup) => {
    setGroup(changeGroup);
  };
  const handleAssignee = (changeAssignee) => {
    setAssignee(changeAssignee);

    cb({ group: group?.id, assignee: changeAssignee?.id });
  };

  return (
    <>
      {!loading && (
        <UserSelectionList
          selectionList={data?.groups}
          defaultValue={groupDefaultVal?.name || ''}
          valueBy="name"
          cb={handleGroupChange}
          label="Group"
          sxStyles={sxStyles}
        />
      )}

      {!loading && group?.users && (
        <UserSelectionList
          selectionList={group.users}
          defaultValue={assignee ? assignee?.name : ''}
          valueBy="name"
          cb={handleAssignee}
          label="Assignee"
          sxStyles={sxStyles}
        />
      )}
    </>
  );
}
export default GroupSelection;
