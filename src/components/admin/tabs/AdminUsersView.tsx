import { useState } from 'react';
import { 
  Users, 
  Search, 
  Eye, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { AdminUserItem, AdminUserRole, AdminUserStatus } from '@/types';
import { AdminUserDetailModal } from '../modals/AdminUserDetailModal';
import { AdminActionConfirmModal } from '../modals/AdminActionConfirmModal';

interface AdminUsersViewProps {
  users: AdminUserItem[];
  onUpdateUserStatus: (userId: string, newStatus: AdminUserStatus) => void;
}

export const AdminUsersView = ({
  users,
  onUpdateUserStatus,
}: AdminUsersViewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | AdminUserRole>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | AdminUserStatus>('All');
  
  // Selected user for details modal
  const [selectedUser, setSelectedUser] = useState<AdminUserItem | null>(null);

  // Status Change Confirmation Modal State
  const [confirmModalState, setConfirmModalState] = useState<{
    isOpen: boolean;
    userId: string;
    userName: string;
    newStatus: AdminUserStatus;
  }>({
    isOpen: false,
    userId: '',
    userName: '',
    newStatus: 'Active',
  });

  // Filter users
  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.state.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || u.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleRequestStatusChange = (userId: string, newStatus: AdminUserStatus) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;
    setConfirmModalState({
      isOpen: true,
      userId,
      userName: user.name,
      newStatus,
    });
  };

  const handleConfirmStatusChange = () => {
    if (confirmModalState.userId) {
      onUpdateUserStatus(confirmModalState.userId, confirmModalState.newStatus);
      if (selectedUser && selectedUser.id === confirmModalState.userId) {
        setSelectedUser({ ...selectedUser, status: confirmModalState.newStatus });
      }
    }
    setConfirmModalState({ isOpen: false, userId: '', userName: '', newStatus: 'Active' });
  };

  const getRoleStyle = (role: AdminUserRole) => {
    switch (role) {
      case 'Farmer':
        return { bg: '#E8EFE5', text: '#164A36', border: '#164A36' };
      case 'Buyer':
        return { bg: '#F1D8C8', text: '#8A4A28', border: '#B86B45' };
      case 'Logistics':
        return { bg: '#DDE8F0', text: '#2A5570', border: '#4A7C9D' };
    }
  };

  const getStatusStyle = (status: AdminUserStatus) => {
    switch (status) {
      case 'Active':
        return { bg: '#E8EFE5', text: '#164A36', border: '#3F7453' };
      case 'Pending Review':
        return { bg: '#FFF3D6', text: '#8A6812', border: '#D9A441' };
      case 'Inactive':
        return { bg: '#FDEAE8', text: '#B94A48', border: '#B94A48' };
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-farm-surface p-6 rounded-3xl border border-farm-border shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-farm-brand-soft text-farm-brand text-[11px] font-bold border border-farm-brand/30 uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Platform User Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-farm-text">
            User Management (Demo Records)
          </h1>
          <p className="text-xs text-farm-text-secondary mt-1">
            Review simulated farmer, buyer, and logistics profiles. Non-sensitive mock identity data only.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-farm-surface border border-farm-border text-xs font-bold text-farm-text">
            Showing <strong className="text-farm-brand">{filteredUsers.length}</strong> of {users.length} Users
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-farm-surface p-4 sm:p-5 rounded-2xl border border-farm-border shadow-subtle space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-farm-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, User ID, district, or state..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs text-farm-text placeholder-farm-text-muted focus:outline-none focus:border-farm-brand transition-colors"
            />
          </div>

          {/* Role Filter */}
          <div className="sm:col-span-3">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs font-semibold text-farm-text focus:outline-none focus:border-farm-brand transition-colors cursor-pointer"
            >
              <option value="All">All Roles (Farmer / Buyer / Logistics)</option>
              <option value="Farmer">Farmer Accounts</option>
              <option value="Buyer">Buyer Accounts</option>
              <option value="Logistics">Logistics Accounts</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs font-semibold text-farm-text focus:outline-none focus:border-farm-brand transition-colors cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button if filtered */}
        {(searchTerm || roleFilter !== 'All' || statusFilter !== 'All') && (
          <div className="flex items-center justify-between pt-2 border-t border-farm-border text-xs text-farm-text-secondary">
            <span>Filters active</span>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setRoleFilter('All');
                setStatusFilter('All');
              }}
              className="inline-flex items-center gap-1 font-bold text-farm-brand hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Users Table (Desktop) & Cards (Mobile) */}
      <div className="bg-farm-surface rounded-3xl border border-farm-border shadow-subtle overflow-hidden">
        {filteredUsers.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-farm-surface text-farm-text-secondary flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-farm-text">
              No matching demo users found
            </h3>
            <p className="text-xs text-farm-text-secondary max-w-sm mx-auto">
              Try adjusting your search criteria or resetting the role and status filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-farm-surface text-farm-text font-bold border-b border-farm-border select-none">
                <tr>
                  <th className="px-5 py-3.5">User ID & Name</th>
                  <th className="px-4 py-3.5">Role</th>
                  <th className="px-4 py-3.5">District & State</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Joined Date</th>
                  <th className="px-4 py-3.5">Verification</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-farm-border">
                {filteredUsers.map((user) => {
                  const roleStyle = getRoleStyle(user.role);
                  const statusStyle = getStatusStyle(user.status);

                  return (
                    <tr key={user.id} className="hover:bg-farm-surface/40 transition-colors">
                      {/* Name & ID */}
                      <td className="px-5 py-4">
                        <div className="font-bold text-sm text-farm-text">{user.name}</div>
                        <div className="text-[11px] font-mono text-farm-text-secondary mt-0.5">{user.userId}</div>
                      </td>

                      {/* Role */}
                      <td className="px-4 py-4">
                        <span
                          className="px-2.5 py-1 rounded-full text-[11px] font-bold border inline-block"
                          style={{
                            backgroundColor: roleStyle.bg,
                            color: roleStyle.text,
                            borderColor: roleStyle.border,
                          }}
                        >
                          {user.role}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="px-4 py-4">
                        <div className="font-medium text-farm-text">{user.district}</div>
                        <div className="text-[11px] text-farm-text-secondary">{user.state}</div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span
                          className="px-2.5 py-1 rounded-full text-[11px] font-bold border inline-block"
                          style={{
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.text,
                            borderColor: statusStyle.border,
                          }}
                        >
                          {user.status}
                        </span>
                      </td>

                      {/* Joined Date */}
                      <td className="px-4 py-4 text-farm-text-secondary font-medium">
                        {user.joinedDate}
                      </td>

                      {/* Verification Status */}
                      <td className="px-4 py-4">
                        <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-farm-brand">
                          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate max-w-[150px]" title={user.verificationBadge}>
                            {user.verificationBadge}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedUser(user)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-farm-surface border border-farm-border text-xs font-bold text-farm-text hover:bg-farm-brand-soft hover:text-farm-brand transition-colors cursor-pointer"
                            title="View Full Profile Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>

                          {user.status === 'Pending Review' ? (
                            <button
                              type="button"
                              onClick={() => handleRequestStatusChange(user.id, 'Active')}
                              className="px-2.5 py-1.5 rounded-lg bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover transition-colors cursor-pointer"
                              title="Approve & Activate Account"
                            >
                              Approve
                            </button>
                          ) : user.status === 'Active' ? (
                            <button
                              type="button"
                              onClick={() => handleRequestStatusChange(user.id, 'Inactive')}
                              className="px-2.5 py-1.5 rounded-lg bg-farm-surface border border-farm-border text-farm-danger text-xs font-bold hover:bg-farm-surface transition-colors cursor-pointer"
                              title="Deactivate Account"
                            >
                              Deactivate
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleRequestStatusChange(user.id, 'Active')}
                              className="px-2.5 py-1.5 rounded-lg bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover transition-colors cursor-pointer"
                              title="Reactivate Account"
                            >
                              Reactivate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      <AdminUserDetailModal
        user={selectedUser}
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        onStatusChange={(userId, newStatus) => handleRequestStatusChange(userId, newStatus)}
      />

      {/* Confirmation Modal for Safe Demo Actions */}
      <AdminActionConfirmModal
        isOpen={confirmModalState.isOpen}
        title={`Confirm Status Update for ${confirmModalState.userName}`}
        description={`Are you sure you want to change this demo user's status to "${confirmModalState.newStatus}"?`}
        confirmLabel={`Set as ${confirmModalState.newStatus}`}
        variant={confirmModalState.newStatus === 'Inactive' ? 'danger' : 'success'}
        onConfirm={handleConfirmStatusChange}
        onCancel={() => setConfirmModalState({ isOpen: false, userId: '', userName: '', newStatus: 'Active' })}
      />
    </div>
  );
};
