# Creating an API with NestJS following TDD mindset
## Description

> :warning: **Disclaimer** : This repo doesn't aim to explain how to create an API with NestJS and TDD. Feel free to check the DZone article (link below).

This code has been created following this [DZone article](https://dzone.com/articles/tdd-typescript-nestjs-api-layers-with-jest-part1-controller).

My goal when discovering this article was to create an API with NestJS using TDD mindset.

With this repository, I want to keep a track of what I learned reading this article, what I want to improve in my next works.

Currently, in the team I'm working with, we're not testing most of our NestJS API endpoints because we estimate that's just some basic CRUD Rest API, and that would be a waste of time. If there's some business logic in the code (not delegated to the database), we'll test it, but that's all.

## Feedback

### Part One - Testing the controller

#### Unit testing a CRUD Rest API

I must confess I've always been very reluctant to perform unit test for an API web server's controller. Checking if my service has been called always seemed like a useless step.

However, in the article, the following sentence made me wonder about that mindset :

> Before going further, it's now apparent that the save method is starting to violate the single responsibility principle — it's also trying to validate the request. Let's refactor this and extract it out. 
 
When checking some code bases I've been working on lately, I can see that my controllers always have a lot of responsibilities :
- Validating data,
- Checking user's rights
- Redirecting to the "good" service method according to its rights
- Performing actions that should have been in the service layer

If I were adding tests to this code bases, that would be hell (Must be why I never tried adding them in the first place. I kind of knew there was a problem in the conception).

Of course, the controller is very simple to test because it's a unique-endpoint API, I need to test it on a bigger application to see how it handles evolution and multiple services, but it seems like a very good start to follow the KISS principle.

#### Using pipes to validate data

We've always been using class validator to validate data. Here, using custom pipes clearly implies more code, but I like the combinaison NestJS Pipes + Joi.
Especially, I'm really keen of getting rid of the DTO in the app after the data has been validated when arriving in the controller.

Instead of having something like :
```typescript
@Post()
save(@Body() myCustomBodyDto: MyCustomBodyDTO) {
  this.service.save(myCustomBodyDto)
}
```
we now have :
```typescript
@Post()
save(@Body(new CustomBodyDtoToCustomBody()) myCustomBody: MyCustomBody) {
  this.service.save(myCustomBody)
}
```
Then, we're working with some real object, without embedding useless elements like the validators, used only when the controller is receiving data.

#### Naming received data

Instead of naming the type of data SpaceShipDTO of something like this, we clearly name it SaveSpaceShipRequest. The name says it all, it's really clear what the data are for, that's nice.

#### Using the NestJS CLI

I've already used the NestJS CLI to bootstrap a code base, to generate some modules/controllers/services, but with pipes too, I wonder if there's other resources this tool can generate to help me speed up on some code skeleton. 

### Part Two - Testing the service

#### The TDD part

I'm a bit confused about this article. The TDD mindset is supposed to be a real part of this approch to create an API. However, it is frequent we get the update of both code and test in the same code block.
TDD has always been kind of extreme and a bit obscure for people not practicing it, and this way to rush things can be disorienting. I had to focus on what the next step was, writing my test then implementing the minimum changes required and, finally, checking the article to compare our solutions.

#### Layers/Methods responsilities

I like the way of thinking about what is the responsibility of the controller (receiving/sending data), the service (not validating data because it is done elsewhere, so we're just checking we're giving the repository and the controller the good object).

### Next steps

- Reading Part III, about unit testing the repository.
- Building one or two more APIs this way to get some automation with this way of creating APIs. (won't be pushed)
- Building a bigger API to ensure the robustness of the conception. (may be pushed)

## Technical part

If you really be want to be sure all the tests pass.

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

### Test

```bash
# unit tests
$ npm test

# test coverage
$ npm run test:cov
```


## License

Nest is [MIT licensed](LICENSE), and so is this repository.
