"use client";

import { DashboardHeader } from '@/components/dashboard-header'
import { DashboardShell } from '@/components/dashboard-shell'
import React from 'react'

const FeedbackPage = () => {
  return (
    <DashboardShell>
        <DashboardHeader heading="Feedback" text='Better the app'/>
    </DashboardShell>
  )
}

export default FeedbackPage