"use client";
import React from "react";
import { Tabs } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  DashboardFilled,
} from "@ant-design/icons"; //
import AdminUser from "./AdminUsers/AdminUser";
import LandingDashboard from "./Dashboard/LandingDashboard";

const { TabPane } = Tabs;

const Adminpage = () => {
  return (
    <div className="mt-12 py-12 bg-yellow-50">
      <Tabs defaultActiveKey="1" centered className="max-w-md mx-auto">
        <TabPane
          tab={
            <span>
              <DashboardFilled />
              Dashboard
            </span>
          }
          key="1"
        >
          <LandingDashboard />
        </TabPane>
        <TabPane
          tab={
            <span>
              <UserOutlined />
              Users
            </span>
          }
          key="2"
        >
          <AdminUser />
        </TabPane>
        <TabPane
          tab={
            <span>
              <FileTextOutlined />
              Posts
            </span>
          }
          key="3"
        >
          Posts Content
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Adminpage;
