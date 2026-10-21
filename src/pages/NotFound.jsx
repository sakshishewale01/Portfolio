import React from 'react'
import { Link } from 'react-router-dom'
import { Section } from '../components/ui/Section'
import { Button } from '../components/ui/Button'
import { ArrowLeft } from 'lucide-react'

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-20">
      <Section
        align="center"
        label="404 Error"
        title="Page Not Found"
        description="The page or asset you are attempting to access does not exist or has been relocated."
      >
        <div className="flex justify-center mt-6">
          <Link to="/">
            <Button variant="primary" icon={ArrowLeft} iconPosition="left">
              Return to System Preview
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  )
}
