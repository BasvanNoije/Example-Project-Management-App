import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Head, Link, router } from '@inertiajs/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid';



export default function Index({ auth, projects, queryParams = null }) {

  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route('project.index'), queryParams)
  }

  const onKeyPress = (name, event) => {
    if (event.key !== 'Enter') return;

    searchFieldChanged(name, event.target.value);
  }

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === 'asc') {
        queryParams.sort_direction = 'desc';
      } else {
        queryParams.sort_direction = 'asc';
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = 'asc';
    }

    router.get(route('project.index'), queryParams)
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Projects
        </h2>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">Projects</div>
            <div className="overflow-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="txt-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th
                      onClick={event => sortChanged('id')}
                    >
                      <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                        ID
                        <div>
                          <ChevronUpIcon className={
                            "w-4 " +
                            (queryParams.sort_field === 'id' && queryParams.sort_direction === 'asc' ? 'text-white' : '')
                          } />
                          <ChevronDownIcon className={
                            "w-4 -mt-2 " +
                            (queryParams.sort_field === 'id' && queryParams.sort_direction === 'desc' ? 'text-white' : '')
                          } />
                        </div>
                      </div>
                    </th>
                    <th
                      className="px-3 py-3"
                    >
                      Image
                    </th>
                    <th
                      onClick={event => sortChanged('name')}
                    >
                      <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                        Name
                        <div>
                          <ChevronUpIcon className={
                            "w-4 " +
                            (queryParams.sort_field === 'name' && queryParams.sort_direction === 'asc' ? 'text-white' : '')
                          } />
                          <ChevronDownIcon className={
                            "w-4 -mt-2 " +
                            (queryParams.sort_field === 'name' && queryParams.sort_direction === 'desc' ? 'text-white' : '')
                          } />
                        </div>
                      </div>
                    </th>
                    <th
                      onClick={event => sortChanged('status')}
                    >
                      <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                        Status
                        <div>
                          <ChevronUpIcon className={
                            "w-4 " +
                            (queryParams.sort_field === 'status' && queryParams.sort_direction === 'asc' ? 'text-white' : '')
                          } />
                          <ChevronDownIcon className={
                            "w-4 -mt-2 " +
                            (queryParams.sort_field === 'status' && queryParams.sort_direction === 'desc' ? 'text-white' : '')
                          } />
                        </div>
                      </div>
                    </th>
                    <th
                      onClick={event => sortChanged('created_at')}
                    >
                      <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                        Create Date
                        <div>
                          <ChevronUpIcon className={
                            "w-4 " +
                            (queryParams.sort_field === 'created_at' && queryParams.sort_direction === 'asc' ? 'text-white' : '')
                          } />
                          <ChevronDownIcon className={
                            "w-4 -mt-2 " +
                            (queryParams.sort_field === 'created_at' && queryParams.sort_direction === 'desc' ? 'text-white' : '')
                          } />
                        </div>
                      </div>
                    </th>
                    <th
                      onClick={event => sortChanged('due_date')}
                    >
                      <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
                        Due Date
                        <div>
                          <ChevronUpIcon className={
                            "w-4 " +
                            (queryParams.sort_field === 'due_date' && queryParams.sort_direction === 'asc' ? 'text-white' : '')
                          } />
                          <ChevronDownIcon className={
                            "w-4 -mt-2 " +
                            (queryParams.sort_field === 'due_date' && queryParams.sort_direction === 'desc' ? 'text-white' : '')
                          } />
                        </div>
                      </div>
                    </th>
                    <th
                      className="px-3 py-3"
                    >
                      Created By
                    </th>
                    <th
                      className="px-3 py-3 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <thead className="txt-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3"></th>
                    <th className="px-3 py-3">
                      <TextInput
                        className="w-full"
                        defaultValue={queryParams.name}
                        placeholder="Project Name"
                        onBlur={event => searchFieldChanged('name', event.target.value)}
                        onKeyPress={event => onKeyPress('name', event)}
                      />
                    </th>
                    <th className="px-3 py-3">
                      <SelectInput
                        className="w-full"
                        defaultValue={queryParams.status}
                        onChange={event => searchFieldChanged('status', event.target.value)}
                      >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </SelectInput>
                    </th>
                    <th className="px-3 py-3"> </th>
                    <th className="px-3 py-3"> </th>
                    <th className="px-3 py-3"> </th>
                    <th className="px-3 py-3 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {projects.data.map(project => (
                    <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-3 py-2">{project.id}</td>
                      <td className="px-3 py-2">
                        <img src={project.image_path} style={{ width: 60 }} />
                      </td>
                      <td className="px-3 py-2">{project.name}</td>
                      <td className="px-3 py-2">
                        <span className={
                          "px-3 py-1 rounded text-white " +
                          PROJECT_STATUS_CLASS_MAP[project.status]}
                        >
                          {PROJECT_STATUS_TEXT_MAP[project.status]}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-nowrap">{project.created_at}</td>
                      <td className="px-3 py-2 text-nowrap">{project.due_date}</td>
                      <td className="px-3 py-2">{project.created_by.name}</td>
                      <td className="px-3 py-2">
                        <Link href={route('project.edit', project.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                          Edit
                        </Link>
                        <Link href={route('project.destroy', project.id)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination links={projects.meta.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
