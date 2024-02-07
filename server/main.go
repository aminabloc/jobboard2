package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Job struct {
	ID       int    `json:"id"`
	Company  string `json:"company"`
	Location string `json:"location"`
	Title    string `json:"title"`
	Closed   bool   `json:"closed"`
	Url      string `json:"url"`
}

func main() {
	//fmt.Print("Hello World")

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	jobs := []Job{}

	//API TEST
	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})

	//CREATE
	app.Post("/api/jobs", func(c *fiber.Ctx) error {
		//initializing variable to create new Job with parameters
		job := &Job{}

		//handling errors
		if err := c.BodyParser(job); err != nil {
			return err
		}

		//assigning an ID that is 1 greater that last ID
		job.ID = len(jobs) + 1

		//handle unique URLS
		for _, existingJob := range jobs {
			if job.Url == existingJob.Url {
				return c.Status(401).SendString("Job Url Already Exists")
			}
		}

		//adding our job to our list jobs
		jobs = append(jobs, *job)

		//returning an updated list
		return c.JSON(jobs)
	})

	//READ
	app.Get("/api/jobs", func(c *fiber.Ctx) error {
		return c.JSON(jobs)
	})

	//UPDATES
	app.Patch("/api/jobs/:id/closed", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")

		if err != nil {
			return c.Status(401).SendString("Invalid ID")
		}

		for i, j := range jobs {
			if j.ID == id {
				jobs[i].Closed = true
			}
		}

		return c.JSON(jobs)

	})

	app.Patch("/api/jobs/:id/unclosed", func(c *fiber.Ctx) error {
		id, err := c.ParamsInt("id")

		if err != nil {
			return c.Status(401).SendString("Invalid ID")
		}

		for i, j := range jobs {
			if j.ID == id {
				jobs[i].Closed = false
				break
			}
		}

		return c.JSON(jobs)

	})

	//SET UP PORT
	log.Fatal(app.Listen(":4001"))

}
