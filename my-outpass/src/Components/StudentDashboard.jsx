import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Label } from "../Components/ui/label";
import { Calendar as  Home, FileText, CheckCircle, XCircle, AlertCircle, Menu } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from "../lib/utils.js";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../Components/ui/sheet";
import api from '../api';
import { useAuth } from '../contexts/AuthContext';

const StudentDashboard = () => {
  const [outpasses, setOutpasses] = useState([]);
  const [activeTab, setActiveTab] = useState('apply');
  const { currentUser } = useAuth();
  const [leavingDate, setLeavingDate] = useState(null);
  const [returningDate, setReturningDate] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    hostelName: '',
    leavingDate: '',
    leavingTime: '',
    returningDate: '',
    returningTime: '',
  });

  const handleOutpassSubmit = async (e) => {
    e.preventDefault();
    try {
      const outpassData = {
        ...formData,
        student: currentUser.id
      };
      const response = await api.post('/api/outpass', outpassData);
      if (response.status === 201) {
        setOutpasses([...outpasses, response.data]);
        setFormData({
          name: '',
          hostelName: '',
          leavingDate: '',
          leavingTime: '',
          returningDate: '',
          returningTime: '',
        });
        setLeavingDate(null);
        setReturningDate(null);
        alert('Outpass submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting outpass:', error);
      alert('Failed to submit outpass. Please try again.');
    }
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const date = new Date(2000, 0, 1, hours, minutes);
    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  const fetchOutpasses = useCallback(async () => {
    try {
      if (currentUser && currentUser.id) {
        const response = await api.get('/api/outpasses');
        const filteredOutpasses = response.data.filter(outpass => 
          outpass && outpass.student && outpass.student.toString() === currentUser.id
        );
        setOutpasses(filteredOutpasses);
      }
    } catch (error) {
      console.error('Error fetching outpasses:', error);
    }
  }, [currentUser]);

  const handleRemove = (id) => {
    setOutpasses(outpasses.filter((outpass) => outpass._id !== id));
  };

  useEffect(() => {
    if (currentUser) {
      fetchOutpasses();
    }
  }, [currentUser, fetchOutpasses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-blue-600">Campus Outpass</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Navigate through your outpass system
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-4">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setActiveTab('apply')
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                Apply for Outpass
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setActiveTab('view')
                }}
              >
                <Home className="mr-2 h-4 w-4" />
                View Outpasses
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <main className="flex-1 p-4 overflow-y-auto pb-16">
        {activeTab === 'apply' ? (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Apply for Outpass</h2>
            <form onSubmit={handleOutpassSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your Name" required className="mt-1" value={formData.name} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="hostelName">Hostel Name</Label>
                <Input id="hostelName" name="hostelName" placeholder="Hostel Name" required className="mt-1" value={formData.hostelName} onChange={handleInputChange} />
              </div>
              <div className="mb-4">
                <label htmlFor="leavingDate" className="block text-gray-700 text-sm font-bold mb-2">Leaving Date</label>
                <input
                  id="leavingDate"
                  type="date"
                  name="leavingDate"
                  value={formData.leavingDate}
                  onChange={handleInputChange}
                  className="border rounded w-full py-2 px-3 text-gray-700"
                  required
                  aria-label="Leaving Date"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="leavingTime" className="block text-gray-700 text-sm font-bold mb-2">Leaving Time</label>
                <input
                  id="leavingTime"
                  type="time"
                  name="leavingTime"
                  value={formData.leavingTime}
                  onChange={handleInputChange}
                  className="border rounded w-full py-2 px-3 text-gray-700"
                  required
                  aria-label="Leaving Time"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="returningDate" className="block text-gray-700 text-sm font-bold mb-2">Returning Date</label>
                <input
                  id="returningDate"
                  type="date"
                  name="returningDate"
                  value={formData.returningDate}
                  onChange={handleInputChange}
                  className="border rounded w-full py-2 px-3 text-gray-700"
                  required
                  aria-label="Returning Date"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="returningTime" className="block text-gray-700 text-sm font-bold mb-2">Returning Time</label>
                <input
                  id="returningTime"
                  type="time"
                  name="returningTime"
                  value={formData.returningTime}
                  onChange={handleInputChange}
                  className="border rounded w-full py-2 px-3 text-gray-700"
                  required
                  aria-label="Returning Time"
                />
              </div>
              <div className="flex justify-center">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">View Outpasses</h2>
            <div className="space-y-4">
              {outpasses.map((outpass) => (
                <div
                  key={outpass._id}
                  className={cn(
                    "p-4 rounded-lg shadow-md transition-all duration-300",
                    outpass.status === 'pending' && "bg-blue-50 border-l-4 border-blue-500",
                    outpass.status === 'approved' && "bg-green-50 border-l-4 border-green-500",
                    outpass.status === 'rejected' && "bg-red-50 border-l-4 border-red-500"
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{outpass.name}</h3>
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-semibold",
                      outpass.status === 'pending' && "bg-blue-100 text-blue-800",
                      outpass.status === 'approved' && "bg-green-100 text-green-800",
                      outpass.status === 'rejected' && "bg-red-100 text-red-800"
                    )}>
                      {outpass.status.charAt(0).toUpperCase() + outpass.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Hostel: {outpass.hostelName}</p>
                  <div className="mb-2">
                    <p className="text-sm">
                      <span className="font-semibold">Leaving:</span> {format(new Date(outpass.leavingDate), "PPP")} at {formatTime(outpass.leavingTime)}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Returning:</span> {format(new Date(outpass.returningDate), "PPP")} at {formatTime(outpass.returningTime)}
                    </p>
                  </div>
                  <div className="mt-2 flex justify-end">
                    {outpass.status === 'pending' && (
                      <AlertCircle className="h-6 w-6 text-blue-500" />
                    )}
                    {outpass.status === 'approved' && (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    )}
                    {outpass.status === 'rejected' && (
                      <XCircle className="h-6 w-6 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0">
        <div className="flex justify-around">
          <Button
            variant="ghost"
            className="flex-1 py-4 px-2 flex flex-col items-center"
            onClick={() => setActiveTab('apply')}
          >
            <FileText className="h-6 w-6 mb-1" />
            <span className="text-xs">Apply</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-1 py-4 px-2 flex flex-col items-center"
            onClick={() => setActiveTab('view')}
          >
            <Home className="h-6 w-6 mb-1" />
            <span className="text-xs">View</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default StudentDashboard;